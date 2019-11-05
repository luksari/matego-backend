import { Controller, Get, Post, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor() {}
  @Get()
  async getXD() {
    return 'Auth';
  }
  @Post('login')
  async login() {}
  @Post('register')
  async register() {}
}
