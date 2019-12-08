import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { Ctx, buildSchema, ID, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AddReviewInput } from './add.review.input';
import { EditReviewInput } from './update.review.input';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';

@Resolver(Review)
export class ReviewsResolver {
  constructor(private readonly reviewService: ReviewsService) {}

  @Query(returns => Review)
  async review(
    @Args({ name: 'reviewId', type: () => ID }) reviewId: number,
    @Ctx() ctx: Context,
  ) {
    const review = this.reviewService.findById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  @Query(returns => [Review])
  async reviews(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
  ) {
    return await this.reviewService.getAll(offset, perPage);
  }

  @Mutation(returns => Review)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async addReview(@Args('review') review?: AddReviewInput) {
    return this.reviewService.createReview(review);
  }

  @Mutation(returns => Review)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async editReview(
    @Args({ name: 'reviewId', type: () => ID }) reviewId: number,
    @Args('review') review?: EditReviewInput,
  ) {
    return await this.reviewService.updateReview(reviewId, review);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async deleteReview(
    @Args({ name: 'reviewId', type: () => ID }) reviewId: number,
    @Ctx() ctx: Context,
  ) {
    return await this.reviewService.deleteReview(reviewId);
  }
}

export const buildReviewsSchema = async () => {
  return await buildSchema({
    resolvers: [ReviewsResolver],
  });
};
