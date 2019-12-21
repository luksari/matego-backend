import { ObjectType, Field, Int } from 'type-graphql';
import { User } from './user.entity';

@ObjectType()
export class UsersResponse {
    @Field(type => [User])
    items: User[];

    @Field(type => Int)
    total: number;
}