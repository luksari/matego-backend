import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class AddProductInput {
  @Field(type => ID)
  manufacturerId: number;
  @Field(type => ID)
  typeId: number;
  @Field()
  name: string;
  @Field({ nullable: true })
  details?: string;
  @Field({ nullable: true })
  photoUrl?: string;
}
