import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Ctx } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { User } from './user.entity';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async user(@Args('userId') userId: number, @Ctx() ctx: Context) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
}
