import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Rank } from './rank.entity';
import { RanksService } from './ranks.service';
import { AddRankInput } from './add.rank.input';
import { EditRankInput } from './edit.rank.input';
import { buildSchema } from 'type-graphql';
@Resolver('Ranks')
export class RanksResolver {
  constructor(private readonly ranksService: RanksService) {}
  @Query(returns => [Rank])
  async ranks() {
    return await this.ranksService.getAll();
  }

  @Query(returns => Rank)
  async rank(@Args('rankId') rankId: number) {
    return await this.ranksService.findById(rankId);
  }

  @Mutation(returns => Rank)
  async addRank(@Args('rank') rank: AddRankInput) {
    return await this.ranksService.addRank(rank);
  }
  @Mutation(returns => Rank)
  async editRank(
    @Args('rankId') rankId: number,
    @Args('rank') rank: EditRankInput,
  ) {
    return await this.ranksService.updateRank(rankId, rank);
  }
  @Mutation(returns => Boolean)
  async deleteRank(@Args('rankId') rankId: number) {
    return await this.ranksService.deleteRank(rankId);
  }
}
export const buildRanksSchema = async () => {
  return await buildSchema({
    resolvers: [RanksResolver],
  });
};
