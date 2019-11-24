import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Review } from '../reviews/review.entity';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'accounts' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  @Field(type => ID)
  id: number;

  @OneToOne(type => Profile)
  @JoinColumn({ name: 'account_user_id' })
  @Field(type => Profile)
  profile: Profile;

  @Column({ name: 'account_username', nullable: false })
  @Field()
  username: string;

  @Column({ name: 'account_password', nullable: false })
  password: string;

  @Column({ name: 'account_mail', nullable: false })
  @Field({ name: 'email' })
  mail: string;

  @Column({ name: 'account_country', nullable: true })
  @Field()
  country?: string;

  @Column({ name: 'account_avatar_url', nullable: true })
  @Field()
  avatarUrl: string;

  @Column({ name: 'account_role', nullable: true })
  @Field({ nullable: true })
  role: string;

  @OneToMany(type => Review, review => review.author)
  @Field(type => [Review], { nullable: true })
  reviews?: Review[];

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'account_edited_at',
  })
  editedAt: string;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'account_created_at',
  })
  @Field()
  createdAt: string;
}
