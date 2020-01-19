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
import { PersonalizedProductsInput } from './personalized.products.input';

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
    personalizedInput?: PersonalizedProductsInput,
  ): Promise<ProductsResponse> {
    let query = this.productsRepository
      .createQueryBuilder(Product.name)
      .leftJoinAndSelect(`${Product.name}.manufacturer`, 'manufacturer')
      .leftJoinAndSelect(`${Product.name}.addedBy`, 'addedBy')
      .leftJoinAndSelect(`${Product.name}.type`, 'type')
      .leftJoinAndSelect(`${Product.name}.reviews`, 'reviews')
      .orderBy(`${Product.name}.${orderBy}`, order);

    let user: User;
    if (userId) {
      user = await this.usersRepository.findOne(userId, {
        relations: ['profile'],
      });
    }

    if (!userId || !user || !personalizedInput.aroma) {
      query = query.skip(offset).take(limit);
    }

    if (searchByName) {
      query = query.where(`${Product.name}.name ilike :name`, {
        name: `%${searchByName}%`,
      });
    }

    const [items, total] = await query.getManyAndCount();

    if (user || personalizedInput.aroma) {
      let sortedItems: Product[] = [];
      if (user && !personalizedInput.aroma) {
        sortedItems = this.personalizeProducts(
          items,
          user.profile.aromaImportance,
          user.profile.bitternessImportance,
          user.profile.tasteImportance,
          user.profile.energyImportance,
          user.profile.priceImportance,
          user.profile.overallImportance,
        );
      } else if (personalizedInput.aroma) {
        sortedItems = this.personalizeProducts(
          items,
          personalizedInput.aroma,
          personalizedInput.bitterness,
          personalizedInput.taste,
          personalizedInput.energy,
          personalizedInput.price,
          personalizedInput.overall,
        );
      }
      return { items: sortedItems.slice(offset, offset + limit), total };
    }

    return { items, total };
  }

  async findById(id: number) {
    return this.productsRepository.findOne(id, {
      relations: ['manufacturer', 'type', 'reviews', 'addedBy'],
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
      const result = await this.productsRepository.delete(id);
      return result.affected > 0;
    } catch (error) {
      throw new NotFoundException('DeleteError', error);
    }
  }

  private calculateScore(
    product: Product,
    aroma: number,
    bitterness: number,
    taste: number,
    energy: number,
    price: number,
    overall: number,
  ) {
    return (
      aroma * product.aromaAverage +
      bitterness * product.bitternessAverage +
      taste * product.tasteAverage +
      energy * product.energyAverage +
      price * product.priceAverage +
      overall * product.overallAverage
    );
  }

  private personalizeProducts(
    products: Product[],
    aroma: number,
    bitterness: number,
    taste: number,
    energy: number,
    price: number,
    overall: number,
  ) {
    const sortedItems: Product[] = [];
    products.forEach(product => {
      product.personalizedScore = this.calculateScore(
        product,
        aroma,
        bitterness,
        taste,
        energy,
        price,
        overall,
      );
      sortedItems.push(product);
    });
    sortedItems.sort((p1, p2) => p2.personalizedScore - p1.personalizedScore);
    return sortedItems;
  }
}
