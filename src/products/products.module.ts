import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Type } from '../types/type.entity';
import { ProductsResolver } from './products.resolver';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Manufacturer, Type, User])],
  providers: [ProductsService, ProductsResolver],
})
export class ProductsModule {}
