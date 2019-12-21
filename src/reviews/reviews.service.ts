import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AddReviewInput } from './add.review.input';
import { EditReviewInput } from './update.review.input';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { ErrorMessages } from '../common/error.messages';
import { ReviewsResponse } from './reviews.response';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async getAll(_offset: number, _limit: number): Promise<ReviewsResponse> {
    const offset = _offset || 0;
    const limit = _limit || 15;
    const [items, total] = await this.reviewsRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['author', 'product', 'product.type'],
    });

    return { items, total };
  }
  async findById(id: number): Promise<Review> {
    return await this.reviewsRepository.findOne(id, {
      relations: ['author', 'product', 'product.type'],
    });
  }
  async deleteReview(id: number): Promise<boolean> {
    try {
      const result: DeleteResult = await this.reviewsRepository.delete(id);
      return true;
    } catch {
      return false;
    }
  }
  async createReview(addReviewInput: AddReviewInput) {
    const user = await this.usersRepository.findOne(addReviewInput.authorId);
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
    }
    const product = await this.productsRepository.findOne(
      addReviewInput.productId,
    );
    if (!product) {
      throw new NotFoundException(ErrorMessages.ProductNotFound);
    }
    const review = this.reviewsRepository.create({
      aroma: addReviewInput.aroma,
      bitterness: addReviewInput.bitterness,
      price: addReviewInput.price,
      taste: addReviewInput.taste,
      energy: addReviewInput.energy,
      overall: addReviewInput.overall,
      description: addReviewInput.description,
      author: user,
      product,
    });
    return await this.reviewsRepository.save(review);
  }
  async updateReview(reviewId: number, editReviewInput: EditReviewInput) {
    const review = await this.findById(reviewId);
    Object.assign(review, editReviewInput);
    await this.reviewsRepository.update(reviewId, review);
    return review;
  }
}
