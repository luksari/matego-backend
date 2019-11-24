import { InputType, Field } from 'type-graphql';

@InputType()
export class AddRankInput {
  @Field()
  name: string;

  @Field()
  lowerRange: number;

  @Field()
  upperRange: number;
}
