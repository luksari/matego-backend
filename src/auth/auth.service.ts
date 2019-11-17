import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './auth.register.dto';
import { AuthResponse } from './auth.response';
import { AuthLoginDto } from './auth.login.dto';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwt.payload';
import { AuthRegisterResponse } from './auth.register.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUserDto: AuthRegisterDto) {
    if (await this.userService.findByUsername(registerUserDto.username)) {
      throw new BadRequestException('User with this name already exists');
    }
    const user = await this.userService.createUser(registerUserDto);
    const response: AuthRegisterResponse = {
      id: user.id,
      username: user.username,
      email: user.mail,
    };
    return response;
  }
  async login(loginUserDto: AuthLoginDto) {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    if (!(await this.userService.verifyUser(user, loginUserDto.password))) {
      throw new BadRequestException('Wrong password');
    }
    return await this.signUser(user);
  }
  async signUser(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.mail,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
    });
    return new AuthResponse(user.id, accessToken);
  }
  async validateUser(payload: JwtPayload) {
    return await this.userService.findByUsername(payload.username);
  }
}
