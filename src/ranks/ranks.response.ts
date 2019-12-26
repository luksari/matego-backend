import { ObjectType, Field, Int } from 'type-graphql';
import { Rank } from './rank.entity';

@ObjectType()
export class RanksResponse {
    @Field(type => [Rank])
    items: Rank[];

    @Field(type => Int)
    total: number;
}