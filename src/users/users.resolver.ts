import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserInfo } from './user.info.model';
import { UsersService } from './users.service';
import { Ctx } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

@Resolver(UserInfo)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(returns => UserInfo)
  @UseGuards(GqlAuthGuard)
  async user(@Args('userId') userId: number, @Ctx() ctx: Context) {
    const user = await this.usersService.findById(userId);
    const info = new UserInfo();
    info.id = user.id;
    info.username = user.username;
    info.email = user.mail;
    return info;
  }
}
