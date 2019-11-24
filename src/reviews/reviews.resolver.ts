import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { Ctx, buildSchema, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { NotFoundException } from '@nestjs/common';
import { AddReviewInput } from './add.review.input';
import { EditReviewInput } from './update.review.input';

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
    return await this.reviewService.getAll();
  }

  @Mutation(returns => Review)
  async addReview(@Args('review') review?: AddReviewInput) {
    return this.reviewService.createReview(review);
  }

  @Mutation(returns => Review)
  async editReview(
    @Args('reviewId') reviewId: number,
    @Args('review') review?: EditReviewInput,
  ) {
    return await this.reviewService.updateReview(reviewId, review);
  }

  @Mutation(returns => Boolean)
  async deleteReview(@Args('reviewId') reviewId: number, @Ctx() ctx: Context) {
    return await this.reviewService.deleteReview(reviewId);
  }
}

export const buildReviewsSchema = async () => {
  return await buildSchema({
    resolvers: [ReviewsResolver],
  });
};
