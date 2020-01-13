import { InputType, Field, ID, Int } from 'type-graphql';
import { Min, Max, IsOptional } from 'class-validator';

@InputType()
export class EditReviewInput {
  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  aroma?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  taste?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  bitterness?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  energy?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  price?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  overall?: number;

  @Field({ nullable: true })
  description?: string;
}
