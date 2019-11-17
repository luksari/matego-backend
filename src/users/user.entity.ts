import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity({ name: 'accounts' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  @Field(type => ID)
  id: number;
  @Column({ name: 'account_username', nullable: false })
  @Field()
  username: string;
  @Column({ name: 'account_password', nullable: false })
  password: string;
  @Column({ name: 'account_mail', nullable: false })
  @Field({ name: 'email' })
  mail: string;
  @Column({ name: 'account_country', nullable: false, default: 'Unknown' })
  @Field()
  country: string;
  @Column({ name: 'account_avatar_url', nullable: true })
  avatarUrl: string;
  @Column({ name: 'account_role', nullable: true })
  role: string;
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
  createdAt: string;
}
