import { InputType, Field, Int } from 'type-graphql';
import { Min, Max, IsOptional } from 'class-validator';

@InputType()
export class PersonalizedProductsInput {
  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  aroma: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  taste: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  bitterness: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  energy: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  price: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { defaultValue: 1 })
  overall: number;
}
