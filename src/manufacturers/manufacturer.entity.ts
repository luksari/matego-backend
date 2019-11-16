import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../users/user.entity';

@Entity({ name: 'manufacturers' })
@ObjectType()
export class Manufacturer {
  @PrimaryGeneratedColumn({ name: 'manufacturer_id' })
  @Field(type => ID)
  id: number;
  @OneToOne(type => User)
  @JoinColumn({ name: 'manufacturer_added_by_account_id' })
  addedBy: User;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'manufacturer_edited_at',
  })
  @Field()
  editedAt: string;
  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'manufacturer_created_at',
  })
  @Field()
  addedAt: string;
}
