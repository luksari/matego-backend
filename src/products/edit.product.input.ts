import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class EditProductInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  details?: string;
  @Field({ nullable: true })
  photoUrl?: string;
  @Field(type => ID, { nullable: true })
  typeId?: number;
  @Field(type => ID, { nullable: true })
  manufacturerId?: number;
}
