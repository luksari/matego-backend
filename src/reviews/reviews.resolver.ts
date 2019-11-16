import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { Ctx, buildSchema } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { NotFoundException } from '@nestjs/common';
import { AddReviewInput } from './add.review.input';

@Resolver(Review)
export class ReviewsResolver {
  constructor(private readonly reviewService: ReviewsService) {}

  @Query(returns => Review)
  async review(@Args('reviewId') reviewId: number, @Ctx() ctx: Context) {
    const review = this.reviewService.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  @Query(returns => [Review])
  async reviews() {
    return this.reviewService.getAll();
  }

  @Mutation(returns => Review)
  async addReview(@Args('review') review?: AddReviewInput) {
    return this.reviewService.createReview(review);
  }
}

export const buildReviewsSchema = async () => {
  return await buildSchema({
    resolvers: [ReviewsResolver],
  });
};
