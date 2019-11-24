import { InputType, Field } from 'type-graphql';

@InputType()
export class EditRankInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lowerRange?: number;

  @Field({ nullable: true })
  upperRange?: number;
}
