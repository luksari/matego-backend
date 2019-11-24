import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'manufacturers' })
@ObjectType()
export class Manufacturer {
  @PrimaryGeneratedColumn({ name: 'manufacturer_id' })
  @Field(type => ID)
  id: number;

  @OneToOne(type => User)
  @JoinColumn({ name: 'manufacturer_added_by_account_id' })
  addedBy: User;

  @Column({ name: 'manufacturer_name', nullable: false })
  @Field()
  name: string;

  @Column({ name: 'manufacturer_country', nullable: false, default: 'Unknown' })
  @Field()
  country: string;

  @Column({ name: 'manufacturer_photo_url', nullable: true })
  @Field({ nullable: true })
  photoUrl?: string;

  @OneToMany(type => Product, product => product.manufacturer)
  @Field(type => [Product], { nullable: true })
  products?: Product[];

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
