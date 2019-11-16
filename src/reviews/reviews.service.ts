import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
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
    return await this.reviewsRepository.find();
  }
  async findById(id: number): Promise<Review> {
    return await this.reviewsRepository.findOne(id);
  }
  async deleteReview(id: number) {
    return await this.reviewsRepository.delete(id);
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
  async updateReview(updateReviewInput: UpdateReviewInput) {
    return await this.reviewsRepository.update(updateReviewInput.id, {
      aroma: updateReviewInput.aroma,
      bitterness: updateReviewInput.bitterness,
      price: updateReviewInput.price,
      taste: updateReviewInput.taste,
      energy: updateReviewInput.energy,
      overall: updateReviewInput.overall,
      description: updateReviewInput.description,
    });
  }
}
