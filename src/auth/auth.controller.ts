import { Controller, Get, Post, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}
  @Post('login')
  async login() {}
  @Post('register')
  async register() {}
}
