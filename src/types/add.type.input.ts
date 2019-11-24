import { Field, InputType } from 'type-graphql';

@InputType()
export class AddTypeInput {
  @Field()
  name: string;
}
