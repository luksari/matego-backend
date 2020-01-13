import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Product } from './product.entity';
import { AddProductInput } from './add.product.input';
import { EditProductInput } from './edit.product.input';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Type } from '../types/type.entity';
import { ErrorMessages } from '../common/error.messages';
import { ProductsResponse } from './products.response';
import { OrderEnum } from '../common/enum';
import { User } from '../users/user.entity';
import { UserRoles } from '../auth/guards/roles/user.roles';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Manufacturer)
    private readonly manufactuersRepository: Repository<Manufacturer>,
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async getAll(
    offset: number = 0,
    limit: number = 15,
    orderBy: string = 'id',
    order: OrderEnum = OrderEnum.DESC,
    searchByName: string,
    userId: number,
  ): Promise<ProductsResponse> {
    let query = this.productsRepository
      .createQueryBuilder(Product.name)
      .leftJoinAndSelect(`${Product.name}.manufacturer`, 'manufacturer')
      .leftJoinAndSelect(`${Product.name}.type`, 'type')
      .leftJoinAndSelect(`${Product.name}.reviews`, 'reviews')
      .orderBy(`${Product.name}.${orderBy}`, order);

    if (!userId) {
      query = query.skip(offset).take(limit);
    }
    if (searchByName) {
      query = query.where(`${Product.name}.name ilike :name`, {
        name: `%${searchByName}%`,
      });
    }

    const [items, total] = await query.getManyAndCount();

    if (userId) {
      const user = await this.usersRepository.findOne(userId, {
        relations: ['profile'],
      });

      const sortedItems: Product[] = [];
      items.forEach(product => {
        product.personalizedScore =
          user.profile.aromaImportance * product.aromaAverage +
          user.profile.bitternessImportance * product.bitternessAverage +
          user.profile.energyImportance * product.energyAverage +
          user.profile.priceImportance * product.priceAverage +
          user.profile.overallImportance * product.overallAverage;
        sortedItems.push(product);
      });
      sortedItems.sort((p1, p2) => p2.personalizedScore - p1.personalizedScore);
      return { items: sortedItems.slice(offset, offset + limit), total };
    }

    return { items, total };
  }

  async findById(id: number) {
    return this.productsRepository.findOne(id, {
      relations: ['manufacturer', 'type', 'reviews'],
    });
  }

  async createProduct(addProduct: AddProductInput, user: User) {
    const manufacturer = await this.manufactuersRepository.findOne(
      addProduct.manufacturerId,
    );
    if (!manufacturer) {
      throw new NotFoundException(ErrorMessages.ManufacturerNotFound);
    }
    const type = await this.typesRepository.findOne(addProduct.typeId);
    if (!type) {
      throw new NotFoundException(ErrorMessages.TypeNotFound);
    }
    const product = await this.productsRepository.create({
      details: addProduct.details,
      manufacturer,
      name: addProduct.name,
      photoUrl: addProduct.photoUrl,
      type,
      addedBy: user,
    });
    return await this.productsRepository.save(product);
  }

  async editProduct(id: number, editProduct: EditProductInput, user: User) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['manufacturer', 'type', 'addedBy'],
    });

    if (user.role === UserRoles.user && product.addedBy.id !== user.id) {
      throw new UnauthorizedException();
    }

    if (editProduct.manufacturerId) {
      const manufacturer = await this.manufactuersRepository.findOne(
        editProduct.manufacturerId,
      );
      if (!manufacturer) {
        throw new NotFoundException(ErrorMessages.ManufacturerNotFound);
      } else {
        product.manufacturer = manufacturer;
      }
    }

    if (editProduct.typeId) {
      const type = await this.typesRepository.findOne(editProduct.typeId);
      if (!type) {
        throw new NotFoundException(ErrorMessages.TypeNotFound);
      } else {
        product.type = type;
      }
    }

    Object.assign(product, editProduct);
    return await this.productsRepository.save(product);
  }

  async deleteProduct(id: number) {
    try {
      await this.productsRepository.delete(id);
      return true;
    } catch {
      return false;
    }
  }
}
