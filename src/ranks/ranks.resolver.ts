import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Rank } from './rank.entity';
import { RanksService } from './ranks.service';
import { AddRankInput } from './add.rank.input';
import { EditRankInput } from './edit.rank.input';
import { buildSchema, ID, Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { Roles } from '../decorators/roles.decorator';
import { RanksResponse } from './ranks.response';
import { OrderEnum } from '../common/enum';

@Resolver('Ranks')
export class RanksResolver {
  constructor(private readonly ranksService: RanksService) {}
  @Query(returns => RanksResponse)
  async ranks(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
    @Args({ name: 'orderBy', type: () => String, nullable: true }) orderBy: string,
    @Args({ name: 'order', type: () => String, nullable: true }) order: OrderEnum,
  ) {
    return await this.ranksService.getAll(offset, perPage, orderBy, order);
  }

  @Query(returns => Rank)
  async rank(@Args({ name: 'rankId', type: () => ID }) rankId: number) {
    return await this.ranksService.findById(rankId);
  }

  @Mutation(returns => Rank)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async addRank(@Args('rank') rank: AddRankInput) {
    return await this.ranksService.addRank(rank);
  }

  @Mutation(returns => Rank)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async editRank(
    @Args({ name: 'rankId', type: () => ID }) rankId: number,
    @Args('rank') rank: EditRankInput,
  ) {
    return await this.ranksService.updateRank(rankId, rank);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteRank(@Args({ name: 'rankId', type: () => ID }) rankId: number) {
    return await this.ranksService.deleteRank(rankId);
  }
}
export const buildRanksSchema = async () => {
  return await buildSchema({
    resolvers: [RanksResolver],
  });
};
