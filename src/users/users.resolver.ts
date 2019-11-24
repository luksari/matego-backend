import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Ctx } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { User } from './user.entity';
import { EditUserInput } from './edit.user.input';

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

  @Query(returns => [User])
  @UseGuards(GqlAuthGuard)
  async users() {
    return await this.usersService.getAll();
  }

  @Mutation(returns => User)
  async editUser(
    @Args('userId') userId: number,
    @Args('user') user: EditUserInput,
  ) {
    return await this.usersService.editUser(userId, user);
  }
}
