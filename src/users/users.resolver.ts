import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Ctx, ID, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { User } from './user.entity';
import { EditUserInput } from './edit.user.input';
import { CurrentUser } from '../decorators/current-user.decorator';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ErrorMessages } from '../common/error.messages';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  async user(
    @Args({ name: 'userId', type: () => ID }) userId: number,
    @Ctx() ctx: Context,
  ) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
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
  @Roles(UserRoles.admin)
  async users(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
  ) {
    return await this.usersService.getAll(offset, perPage);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async editUser(
    @Args({ name: 'userId', type: () => ID }) userId: number,
    @Args('user') user: EditUserInput,
  ) {
    return await this.usersService.editUser(userId, user);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async assignAdmin(@Args({ name: 'userId', type: () => ID }) userId: number) {
    return await this.usersService.assignAdmin(userId);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async revokeAdmin(@Args({ name: 'userId', type: () => ID }) userId: number) {
    return await this.usersService.revokeAdmin(userId);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteUser(@Args({ name: 'userId', type: () => ID }) userId: number) {
    return await this.usersService.deleteUser(userId);
  }
}
