import { Controller, Get, UseGuards } from '@nestjs/common';
import { rpc } from 'protobufjs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  getHello(): string {
    return 'Hello World!';
  }
}
