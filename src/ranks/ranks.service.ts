import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rank } from './rank.entity';
import { Repository } from 'typeorm';
import { AddRankInput } from './add.rank.input';
import { EditRankInput } from './edit.rank.input';
import { RanksResponse } from './ranks.response';
import { OrderEnum } from '../common/enum';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank)
    private readonly ranksRepository: Repository<Rank>,
  ) {}

  async getAll(
    offset: number = 0,
    limit: number = 15,
    orderBy: string = 'id',
    order: OrderEnum = OrderEnum.DESC,
  ): Promise<RanksResponse> {
    const [items, total] = await this.ranksRepository
      .createQueryBuilder(Rank.name)
      .orderBy(`${Rank.name}.${orderBy}`, order)
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return { items, total };
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
      const result = await this.ranksRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      throw new NotFoundException('DeleteError', error);
    }
  }
}
