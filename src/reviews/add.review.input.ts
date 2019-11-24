import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class AddReviewInput {
  @Field({ nullable: true })
  aroma?: number;
  @Field({ nullable: true })
  taste?: number;
  @Field({ nullable: true })
  bitterness?: number;
  @Field({ nullable: true })
  energy?: number;
  @Field({ nullable: true })
  price?: number;
  @Field({ nullable: true })
  overall?: number;
  @Field()
  description: string;
  @Field(type => ID)
  authorId: number;
  @Field(type => ID)
  productId: number;
}
