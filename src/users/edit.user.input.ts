import { InputType, Field, Int } from 'type-graphql';
import { Min, Max, IsOptional } from 'class-validator';

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  aromaImportance?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  tasteImportance?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  bitternessImportance?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  priceImportance?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  energyImportance?: number;

  @IsOptional()
  @Min(1)
  @Max(5)
  @Field(type => Int, { nullable: true })
  overallImportance?: number;
}
