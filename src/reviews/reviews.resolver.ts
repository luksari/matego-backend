import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { Ctx, buildSchema, ID, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AddReviewInput } from './add.review.input';
import { EditReviewInput } from './edit.review.input';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ReviewsResponse } from './reviews.response';
import { OrderEnum } from '../common/enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';

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

  @Query(returns => ReviewsResponse)
  async reviews(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
    @Args({ name: 'orderBy', type: () => String, nullable: true })
    orderBy: string,
    @Args({ name: 'order', type: () => String, nullable: true })
    order: OrderEnum,
  ) {
    return await this.reviewService.getAll(offset, perPage, orderBy, order);
  }

  @Mutation(returns => Review)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async addReview(
    @Args('review') review: AddReviewInput,
    @CurrentUser() user: User,
  ) {
    return this.reviewService.createReview(review, user);
  }

  @Mutation(returns => Review)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async editReview(
    @Args({ name: 'reviewId', type: () => ID }) reviewId: number,
    @Args('review') review: EditReviewInput,
    @CurrentUser() user: User,
  ) {
    return await this.reviewService.updateReview(reviewId, review, user);
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
