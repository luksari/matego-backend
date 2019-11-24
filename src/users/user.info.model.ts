import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserInfo {
  @Field(type => ID)
  id: number;
  @Field()
  username: string;
  @Field()
  email: string;
}
