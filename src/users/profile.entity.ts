import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'users' })
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @Field(type => ID)
  id: number;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'user_edited_at',
  })
  @Field()
  editedAt: string;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'user_created_at',
  })
  @Field()
  createdAt: string;
}
