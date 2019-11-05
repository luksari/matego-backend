import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getOK(): string {
    return 'Auth';
  }
}
