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
import { UserRoles } from '../auth/guards/roles/user.roles';
import { Product } from '../products/product.entity';

@Entity({ name: 'accounts' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  @Field(type => ID)
  id: number;

  @OneToOne(type => Profile, { onDelete: 'CASCADE' })
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
  email: string;

  @Column({ name: 'account_country', nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column({ name: 'account_avatar_url', nullable: true })
  @Field({ nullable: true })
  avatarUrl?: string;

  @Column({ name: 'account_role', nullable: false, default: UserRoles.user })
  @Field({ nullable: false })
  role: string;

  @OneToMany(type => Review, review => review.author)
  @Field(type => [Review], { nullable: true })
  reviews?: Review[];

  @OneToMany(type => Product, product => product.addedBy)
  @Field(type => [Product], { nullable: true })
  products?: Product[];

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
