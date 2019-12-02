import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/user.entity';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => {
      if (user.role) {
        return roles.includes(user.role);
      } else {
        return false;
      }
    };

    return user && user.role && hasRole();
  }
}
