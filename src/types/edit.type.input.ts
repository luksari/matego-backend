import { Field, InputType } from 'type-graphql';

@InputType()
export class EditTypeInput {
  @Field()
  name: string;
}
