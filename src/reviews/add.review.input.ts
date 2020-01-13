import { InputType, Field, ID, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

@InputType()
export class AddReviewInput {
  @Min(1)
  @Max(5)
  @Field(type => Int)
  aroma: number;

  @Min(1)
  @Max(5)
  @Field(type => Int)
  taste: number;

  @Min(1)
  @Max(5)
  @Field(type => Int)
  bitterness: number;

  @Min(1)
  @Max(5)
  @Field(type => Int)
  energy: number;

  @Min(1)
  @Max(5)
  @Field(type => Int)
  price: number;

  @Min(1)
  @Max(5)
  @Field(type => Int)
  overall: number;

  @Field({ nullable: true })
  description?: string;

  @Field(type => ID)
  productId: number;
}
