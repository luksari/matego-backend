import { Manufacturer } from './manufacturer.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class ManufacturersResponse {
    @Field(type => [Manufacturer])
    items: Manufacturer[]
    
    @Field(type => Int)
    total: number;
}