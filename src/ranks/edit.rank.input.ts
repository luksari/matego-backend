import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EditRankInput {
  @Field({ nullable: true })
  name?: string;

  @Field(type => Int, { nullable: true })
  lowerRange?: number;

  @Field(type => Int, { nullable: true })
  upperRange?: number;
}
