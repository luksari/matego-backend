import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { Repository } from 'typeorm';
import { AddTypeInput } from './add.type.input';
import { EditTypeInput } from './edit.type.input';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
  ) {}
  async getAll() {
    return await this.typesRepository.find();
  }
  async findById(id: number) {
    return await this.typesRepository.findOne(id);
  }
  async createType(addType: AddTypeInput) {
    const type = this.typesRepository.create(addType);
    return await this.typesRepository.save(type);
  }
  async editType(id: number, editType: EditTypeInput) {
    await this.typesRepository.update(id, editType);
    return await this.findById(id);
  }
  async deleteType(id: number) {
    try {
      await this.typesRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}