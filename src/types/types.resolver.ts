import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TypesService } from './types.service';
import { Type } from './type.entity';
import { AddTypeInput } from './add.type.input';
import { EditTypeInput } from './edit.type.input';

@Resolver(Type)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) {}

  @Query(returns => [Type])
  async types() {
    return await this.typesService.getAll();
  }

  @Mutation(returns => Type)
  async type(@Args('typeId') typeId: number) {
    return await this.typesService.findById(typeId);
  }

  @Mutation(returns => Type)
  async addType(@Args('type') type: AddTypeInput) {
    return await this.typesService.createType(type);
  }
  @Mutation(returns => Type)
  async editType(
    @Args('typeId') typeId: number,
    @Args('type') type: EditTypeInput,
  ) {
    return await this.typesService.editType(typeId, type);
  }
  @Mutation(returns => Boolean)
  async deleteType(@Args('typeId') typeId: number) {
    return await this.typesService.deleteType(typeId);
  }
}
