import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Ctx } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { User } from './user.entity';
import { EditUserInput } from './edit.user.input';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';

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
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return await this.usersService.findById(user.id);
  }

  @Query(returns => [User])
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles('admin')
  async users() {
    return await this.usersService.getAll();
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async editUser(
    @Args('userId') userId: number,
    @Args('user') user: EditUserInput,
  ) {
    return await this.usersService.editUser(userId, user);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async assignAdmin(@Args('userId') userId: number) {
    return await this.usersService.assignAdmin(userId);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async revokeAdmin(@Args('userId') userId: number) {
    return await this.usersService.revokeAdmin(userId);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteUser(@Args('userId') userId: number) {
    return await this.usersService.deleteUser(userId);
  }
}
