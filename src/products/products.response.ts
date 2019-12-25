import { ObjectType, Field, Int } from 'type-graphql';
import { Product } from './product.entity';

@ObjectType()
export class ProductsResponse {
    @Field(type => [Product])
    items: Product[];

    @Field(type => Int)
    total: number;
}