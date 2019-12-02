import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field(type => Int, { nullable: true })
  aromaImportance?: number;

  @Field(type => Int, { nullable: true })
  tasteImportance?: number;

  @Field(type => Int, { nullable: true })
  bitternessImportance?: number;

  @Field(type => Int, { nullable: true })
  priceImportance?: number;

  @Field(type => Int, { nullable: true })
  energyImportance?: number;

  @Field(type => Int, { nullable: true })
  overallImportance?: number;
}
