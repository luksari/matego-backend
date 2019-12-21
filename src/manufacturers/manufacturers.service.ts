import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository, DeleteResult } from 'typeorm';
import { AddManufacturerInput } from './add.manufacturer.input';
import { User } from '../users/user.entity';
import { EditManufacturerInput } from './edit.manufacturer.input';
import { ErrorMessages } from '../common/error.messages';
import { ManufacturersResponse } from './manufacturers.response';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturersRepository: Repository<Manufacturer>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(_offset: number, _limit: number): Promise<ManufacturersResponse> {
    const offset = _offset || 0;
    const limit = _limit || 15;
    const [items, total] = await this.manufacturersRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['products'],
    });
    return { items, total }
  }
  async findById(id: number): Promise<Manufacturer> {
    return await this.manufacturersRepository.findOne(id, {
      relations: ['products'],
    });
  }
  async deleteManufacturer(id: number) {
    try {
      await this.manufacturersRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async createManufacturer(addManufacturerInput: AddManufacturerInput) {
    const user = await this.usersRepository.findOne(
      addManufacturerInput.creatorId,
    );
    if (!user) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
    }
    const manufactuer = this.manufacturersRepository.create({
      name: addManufacturerInput.name,
      country: addManufacturerInput.country,
      photoUrl: addManufacturerInput.photoUrl,
      addedBy: user,
    });
    return this.manufacturersRepository.save(manufactuer);
  }
  async updateManufacturer(
    id: number,
    editManufacturer: EditManufacturerInput,
  ) {
    const manufacturer = await this.findById(id);
    Object.assign(manufacturer, editManufacturer);
    await this.manufacturersRepository.update(id, manufacturer);
    return manufacturer;
  }
}
