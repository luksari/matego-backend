import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AddRankInput {
  @Field()
  name: string;

  @Field(type => Int)
  lowerRange: number;

  @Field(type => Int)
  upperRange: number;
}
