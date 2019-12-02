import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class AddReviewInput {
  @Field(type => Int, { nullable: true })
  aroma?: number;
  @Field(type => Int, { nullable: true })
  taste?: number;
  @Field(type => Int, { nullable: true })
  bitterness?: number;
  @Field(type => Int, { nullable: true })
  energy?: number;
  @Field(type => Int, { nullable: true })
  price?: number;
  @Field(type => Int, { nullable: true })
  overall?: number;
  @Field()
  description: string;
  @Field(type => ID)
  authorId: number;
  @Field(type => ID)
  productId: number;
}
