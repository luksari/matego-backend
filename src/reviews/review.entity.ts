import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'reviews' })
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  @Field(type => ID)
  id: number;

  @Column({ name: 'review_aroma', nullable: false, default: 5 })
  @Field()
  aroma: number;

  @Column({ name: 'review_taste', nullable: false, default: 5 })
  @Field()
  taste: number;

  @Column({ name: 'review_bitterness', nullable: false, default: 5 })
  @Field()
  bitterness: number;

  @Column({ name: 'review_energy', nullable: false, default: 5 })
  @Field()
  energy: number;

  @Column({ name: 'review_price', nullable: false, default: 5 })
  @Field()
  price: number;

  @Column({ name: 'review_overall', nullable: false, default: 5 })
  @Field()
  overall: number;

  @Column({ name: 'review_description', nullable: false, default: '' })
  @Field()
  description: string;

  @ManyToOne(type => Product, product => product.reviews)
  @JoinColumn({ name: 'review_product_id' })
  @Field(type => Product)
  product: Product;

  @ManyToOne(type => User, user => user.reviews)
  @JoinColumn({ name: 'review_author_id' })
  @Field(type => User)
  author: User;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'review_edited_at',
  })
  @Field()
  editedAt: string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'review_created_at',
  })
  @Field()
  addedAt: string;
}
