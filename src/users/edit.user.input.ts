import { InputType, Field } from 'type-graphql';

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field({ nullable: true })
  aromaImportance?: number;

  @Field({ nullable: true })
  tasteImportance?: number;

  @Field({ nullable: true })
  bitternessImportance?: number;

  @Field({ nullable: true })
  priceImportance?: number;

  @Field({ nullable: true })
  energyImportance?: number;

  @Field({ nullable: true })
  overallImportance?: number;
}
