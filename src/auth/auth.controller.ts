import {
  Controller,
  Get,
  Post,
  Inject,
  Res,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './auth.login.dto';
import { AuthRegisterDto } from './auth.register.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './auth.response';
import { AuthRegisterResponse } from './auth.register.response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll() {
    return {
      message: 'JWT works!',
    };
  }

  @Post('login')
  @ApiOkResponse({ description: 'Successfully logged in', type: AuthResponse })
  @ApiBadRequestResponse({})
  @ApiNotFoundResponse({})
  async login(@Res() res: Response, @Body() authLogin: AuthLoginDto) {
    res.status(HttpStatus.OK).json(await this.authService.login(authLogin));
  }

  @Post('register')
  @ApiOkResponse({
    description: 'Successfully registered',
    type: AuthRegisterResponse,
  })
  @ApiBadRequestResponse({})
  async register(@Res() res: Response, @Body() authRegister: AuthRegisterDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.authService.register(authRegister));
  }
}
