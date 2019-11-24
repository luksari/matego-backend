import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class EditManufacturerInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
