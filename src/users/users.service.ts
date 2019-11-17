import { Injectable, Inject } from '@nestjs/common';
import { Repository, Equal } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { AuthRegisterDto } from '../auth/auth.register.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findById(id: number) {
    return await this.usersRepository.findOne(id);
  }
  async createUser(createUserDto: AuthRegisterDto) {
    const password = await this.hashPassword(createUserDto.password);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password,
      mail: createUserDto.email,
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
}
