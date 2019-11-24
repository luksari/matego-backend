import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './rank.entity';
import { Repository } from 'typeorm';
import { AddRankInput } from './add.rank.input';
import { EditRankInput } from './edit.rank.input';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank)
    private readonly ranksRepository: Repository<Rank>,
  ) {}

  async getAll() {
    return await this.ranksRepository.find();
  }
  async findById(id: number) {
    return await this.ranksRepository.findOne(id);
  }
  async addRank(addRank: AddRankInput) {
    const rank = this.ranksRepository.create(addRank);
    return await this.ranksRepository.save(rank);
  }
  async updateRank(id: number, editRank: EditRankInput) {
    const rank = await this.findById(id);
    Object.assign(rank, editRank);
    await this.ranksRepository.update(id, rank);
    return rank;
  }
  async deleteRank(id: number) {
    try {
      await this.ranksRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
