import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AddReviewInput } from './add.review.input';
import { UpdateReviewInput } from './update.review.input';
import { User } from '../users/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async getAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: ['accounts', 'products', 'types'],
    });
  }
  async findById(id: number): Promise<Review> {
    return await this.reviewsRepository.findOne(id, {
      relations: ['accounts', 'products', 'types'],
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
      throw new NotFoundException(
        `User with id: ${addReviewInput.authorId} not found.`,
      );
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
    });
    return await this.reviewsRepository.save(review);
  }
  async updateReview(reviewId: number, updateReviewInput: UpdateReviewInput) {
    const review = await this.findById(reviewId);
    Object.assign(review, updateReviewInput);
    await this.reviewsRepository.update(reviewId, review);
    return review;
  }
}
