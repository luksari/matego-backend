import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { AuthRegisterDto } from '../auth/auth.register.dto';
import { Profile } from './profile.entity';
import { EditUserInput } from './edit.user.input';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ErrorMessages } from '../common/error.messages';
import { UsersResponse } from './users.response';
import { OrderEnum } from '../common/enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async getAll(
    offset: number = 0,
    limit: number = 15,
    orderBy: string = 'id',
    order: OrderEnum = OrderEnum.DESC,
  ): Promise<UsersResponse> {
    const [items, total] = await this.usersRepository
      .createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.profile`, 'profile')
      .leftJoinAndSelect(`profile.rank`, 'rank')
      .leftJoinAndSelect(`${User.name}.reviews`, 'reviews')
      .leftJoinAndSelect(`reviews.product`, 'products')
      .orderBy(`${User.name}.${orderBy}`, order)
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async findById(id: number) {
    return await this.usersRepository.findOne(id, {
      relations: [
        'reviews',
        'profile',
        'profile.rank',
        'reviews.product',
        'products',
      ],
    });
  }

  async createUser(createUserDto: AuthRegisterDto) {
    const password = await this.hashPassword(createUserDto.password);
    const profile = await this.profileRepository.create();
    await this.profileRepository.save(profile);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password,
      profile,
      email: createUserDto.email,
    });
    return await this.usersRepository.save(user);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password);
  }

  async verifyUser(user: User, password: string): Promise<boolean> {
    return await verify(user.password, password);
  }

  async editUser(userId: number, editUserInput: EditUserInput) {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['profile'],
    });
    const profile = await this.profileRepository.findOne(user.profile.id);
    Object.assign(profile, editUserInput);
    await this.profileRepository.save(profile);
    Object.assign(user, editUserInput);
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(userId: number, currentUser: User) {
    if (userId === currentUser.id) {
      throw new BadRequestException('WrongUserId');
    }
    try {
      const result = await this.usersRepository.delete(userId);
      return result.affected > 0;
    } catch (error) {
      throw new NotFoundException('DeleteError', error);
    }
  }

  async assignAdmin(userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserExists);
    }
    user.role = UserRoles.admin;
    await this.usersRepository.update(userId, {
      role: UserRoles.admin,
    });

    return user;
  }

  async revokeAdmin(userId: number, currentUser: User) {
    if (userId === currentUser.id) {
      throw new BadRequestException('WrongUserId');
    }

    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
    }

    user.role = UserRoles.user;
    await this.usersRepository.update(userId, {
      role: UserRoles.user,
    });

    return user;
  }
}
