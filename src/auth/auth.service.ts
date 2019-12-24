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
import { JwtPayload } from './strategies/jwt.payload';
import { AuthRegisterResponse } from './auth.register.response';
import { ErrorMessages } from '../common/error.messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUserDto: AuthRegisterDto) {
    if (await this.userService.findByUsername(registerUserDto.username)) {
      throw new BadRequestException(ErrorMessages.UserExists);
    }
    const user = await this.userService.createUser(registerUserDto);
    const response: AuthRegisterResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return response;
  }
  async login(loginUserDto: AuthLoginDto) {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
    }
    if (!(await this.userService.verifyUser(user, loginUserDto.password))) {
      throw new BadRequestException(ErrorMessages.WrongPassword);
    }
    return await this.signUser(user);
  }
  async signUser(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
    });
    return new AuthResponse(user.id, user.role, accessToken);
  }
  async validateUser(payload: JwtPayload) {
    return await this.userService.findByUsername(payload.username);
  }
}
