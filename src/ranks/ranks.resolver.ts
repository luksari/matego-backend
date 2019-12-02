import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Rank } from './rank.entity';
import { RanksService } from './ranks.service';
import { AddRankInput } from './add.rank.input';
import { EditRankInput } from './edit.rank.input';
import { buildSchema, ID } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { Roles } from '../decorators/roles.decorator';
@Resolver('Ranks')
export class RanksResolver {
  constructor(private readonly ranksService: RanksService) {}
  @Query(returns => [Rank])
  async ranks() {
    return await this.ranksService.getAll();
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
