import { InputType, Field, Int } from 'type-graphql';
import { Min, Max, IsOptional } from 'class-validator';

@InputType()
export class PersonalizedProductsInput {
  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  aroma: number;

  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  taste: number;

  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  bitterness: number;

  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  energy: number;

  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  price: number;

  @IsOptional()
  @Min(0)
  @Max(5)
  @Field(type => Int, { defaultValue: 0 })
  overall: number;
}
