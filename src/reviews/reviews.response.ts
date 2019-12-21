import { ObjectType, Field, Int } from 'type-graphql';
import { Review } from './review.entity';

@ObjectType()
export class ReviewsResponse {
    @Field(type => [Review])
    items: Review[];

    @Field(type => Int)
    total: number;
}