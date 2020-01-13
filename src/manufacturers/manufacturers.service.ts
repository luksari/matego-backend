import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';
import { AddManufacturerInput } from './add.manufacturer.input';
import { User } from '../users/user.entity';
import { EditManufacturerInput } from './edit.manufacturer.input';
import { ErrorMessages } from '../common/error.messages';
import { ManufacturersResponse } from './manufacturers.response';
import { OrderEnum } from '../common/enum';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturersRepository: Repository<Manufacturer>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(
    offset: number = 0,
    limit: number = 15,
    orderBy: string = 'id',
    order: OrderEnum = OrderEnum.DESC,
    searchByName: string,
  ): Promise<ManufacturersResponse> {
    let query = this.manufacturersRepository
      .createQueryBuilder(Manufacturer.name)
      .leftJoinAndSelect(`${Manufacturer.name}.products`, 'products')
      .orderBy(`${Manufacturer.name}.${orderBy}`, order)
      .skip(offset)
      .take(limit);

    if (searchByName) {
      query = query.where(`${Manufacturer.name}.name ilike :name`, {
        name: `%${searchByName}%`,
      });
    }

    const [items, total] = await query.getManyAndCount();
    return { items, total };
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
  async createManufacturer(
    addManufacturerInput: AddManufacturerInput,
    addedBy: User,
  ) {
    if (!addedBy) {
      throw new NotFoundException(ErrorMessages.UserNotFound);
    }
    const manufactuer = this.manufacturersRepository.create({
      name: addManufacturerInput.name,
      country: addManufacturerInput.country,
      photoUrl: addManufacturerInput.photoUrl,
      addedBy,
    });
    return this.manufacturersRepository.save(manufactuer);
  }
  async updateManufacturer(
    id: number,
    editManufacturer: EditManufacturerInput,
  ) {
    const manufacturer = await this.findById(id);
    Object.assign(manufacturer, editManufacturer);
    return await this.manufacturersRepository.save(manufacturer);
  }
}
