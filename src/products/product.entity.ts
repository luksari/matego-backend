import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Type } from '../types/type.entity';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Review } from '../reviews/review.entity';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  @Field(type => ID)
  id: number;

  @ManyToOne(type => Manufacturer, manufacturer => manufacturer.products)
  @JoinColumn({ name: 'product_manufacturer_id' })
  @Field(type => Manufacturer)
  manufacturer: Manufacturer;

  @ManyToOne(type => Type)
  @JoinColumn({ name: 'product_type_id' })
  @Field(type => Type)
  type: Type;

  @OneToMany(type => Review, review => review.product)
  @Field(type => [Review], { nullable: true })
  reviews?: Review[];

  @Column({ name: 'product_name', nullable: false })
  @Field()
  name: string;

  @Column({ name: 'product_details', nullable: false })
  @Field()
  details: string;

  @Column({ name: 'product_photo_url', nullable: true })
  @Field({ nullable: true })
  photoUrl?: string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'product_added_at',
  })
  @Field()
  createdAt: string;
}
