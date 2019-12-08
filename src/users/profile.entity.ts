import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Rank } from '../ranks/rank.entity';

@Entity({ name: 'users' })
@ObjectType()
export class Profile {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  @Field(type => ID)
  id: number;

  @ManyToOne(type => Rank)
  @JoinColumn({ name: 'user_rank_id' })
  @Field(type => Rank)
  rank: Rank;

  @Column({ name: 'user_experience_points', nullable: false, default: 0 })
  @Field(type => Int)
  experiencePoints: number;

  @Column({ name: 'user_aroma_importance', nullable: false, default: 3 })
  @Field(type => Int)
  aromaImportance: number;

  @Column({ name: 'user_taste_importance', nullable: false, default: 3 })
  @Field(type => Int)
  tasteImportance: number;

  @Column({ name: 'user_bitterness_importance', nullable: false, default: 3 })
  @Field(type => Int)
  bitternessImportance: number;

  @Column({ name: 'user_price_importance', nullable: false, default: 3 })
  @Field(type => Int)
  priceImportance: number;

  @Column({ name: 'user_energy_importance', nullable: false, default: 3 })
  @Field(type => Int)
  energyImportance: number;

  @Column({ name: 'user_overall_importance', nullable: false, default: 3 })
  @Field(type => Int)
  overallImportance: number;

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
