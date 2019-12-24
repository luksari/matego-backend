import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Manufacturer)
    private readonly manufactuersRepository: Repository<Manufacturer>,
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
  ) {}
  async getAll(offset: number = 0, limit: number = 15, orderBy: string = 'id', order: OrderEnum = OrderEnum.DESC): Promise<ProductsResponse> {
    const [items, total] = await this.productsRepository
    .createQueryBuilder(Product.name)
    .leftJoinAndSelect(`${Product.name}.manufacturer`, 'manufacturer')
    .leftJoinAndSelect(`${Product.name}.type`, 'type')
    .leftJoinAndSelect(`${Product.name}.reviews`, 'reviews')
    .orderBy(`${Product.name}.${orderBy}`, order)
    .skip(offset)
    .take(limit)
    .getManyAndCount();

    return { items, total }
  }
  async findById(id: number) {
    return this.productsRepository.findOne(id, {
      relations: ['manufacturer', 'type', 'reviews'],
    });
  }
  async createProduct(addProduct: AddProductInput) {
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
    });
    return await this.productsRepository.save(product);
  }
  async editProduct(id: number, editProduct: EditProductInput) {
    const product = await this.findById(id);
    Object.assign(product, editProduct);
    await this.productsRepository.update(id, {
      name: product.name,
      details: product.details,
      photoUrl: product.photoUrl,
    });
    return product;
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
