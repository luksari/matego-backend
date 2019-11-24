import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class EditProductInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  details?: string;
  @Field({ nullable: true })
  photoUrl?: string;
}
