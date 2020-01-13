import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'reviews' })
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  @Field(type => ID)
  id: number;

  @Column({ name: 'review_aroma', nullable: false })
  @Field(type => Int)
  aroma: number;

  @Column({ name: 'review_taste', nullable: false })
  @Field(type => Int)
  taste: number;

  @Column({ name: 'review_bitterness', nullable: false })
  @Field(type => Int)
  bitterness: number;

  @Column({ name: 'review_energy', nullable: false })
  @Field(type => Int)
  energy: number;

  @Column({ name: 'review_price', nullable: false })
  @Field(type => Int)
  price: number;

  @Column({ name: 'review_overall', nullable: false })
  @Field(type => Int)
  overall: number;

  @Column({ name: 'review_description', nullable: true })
  @Field({ nullable: true })
  description?: string;

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
  createdAt: string;
}
