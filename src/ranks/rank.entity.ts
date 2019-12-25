import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';

@Entity({ name: 'ranks' })
@ObjectType()
export class Rank {
  @PrimaryGeneratedColumn({ name: 'rank_id' })
  @Field(type => ID)
  id: number;

  @Column({ name: 'rank_name', nullable: false })
  @Field()
  name: string;

  @Column({ name: 'rank_lower_range', nullable: false })
  @Field(type => Int)
  lowerRange: number;

  @Column({ name: 'rank_upper_range', nullable: false })
  @Field(type => Int)
  upperRange: number;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'rank_added_at',
  })
  @Field()
  createdAt: string;
}
