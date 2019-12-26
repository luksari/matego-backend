import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'types' })
@ObjectType('ProductType')
export class Type {
  @PrimaryGeneratedColumn({ name: 'type_id' })
  @Field(type => ID)
  id: number;

  @Column({ name: 'type_name', nullable: false })
  @Field()
  name: string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'type_added_at',
  })
  @Field()
  createdAt: string;
}
