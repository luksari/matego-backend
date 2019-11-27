import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class AddManufacturerInput {
  @Field()
  name: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field(type => ID)
  creatorId: number;
}
