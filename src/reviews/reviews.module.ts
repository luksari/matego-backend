import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Profile } from 'src/users/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Profile, Product])],
  providers: [ReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
