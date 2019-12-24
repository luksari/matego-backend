import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TypesService } from './types.service';
import { Type } from './type.entity';
import { AddTypeInput } from './add.type.input';
import { EditTypeInput } from './edit.type.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ID, Int } from 'type-graphql';
import { TypesResponse } from './types.response';
import { OrderEnum } from '../common/enum';

@Resolver(Type)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) {}

  @Query(returns => TypesResponse)
  async types(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
    @Args({ name: 'orderBy', type: () => String, nullable: true }) orderBy: string,
    @Args({ name: 'order', type: () => String, nullable: true }) order: OrderEnum,
  ) {
    return await this.typesService.getAll(offset, perPage, orderBy, order);
  }

  @Query(returns => Type)
  async type(@Args({ name: 'typeId', type: () => ID }) typeId: number) {
    return await this.typesService.findById(typeId);
  }

  @Mutation(returns => Type)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async addType(@Args('type') type: AddTypeInput) {
    return await this.typesService.createType(type);
  }

  @Mutation(returns => Type)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async editType(
    @Args({ name: 'typeId', type: () => ID }) typeId: number,
    @Args('type') type: EditTypeInput,
  ) {
    return await this.typesService.editType(typeId, type);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteType(@Args({ name: 'typeId', type: () => ID }) typeId: number) {
    return await this.typesService.deleteType(typeId);
  }
}
