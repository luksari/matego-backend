import { ObjectType, Field, Int } from 'type-graphql';
import { Type } from './type.entity';

@ObjectType()
export class TypesResponse {
    @Field(type => [Type])
    items: Type[];

    @Field(type => Int)
    total: number;
}