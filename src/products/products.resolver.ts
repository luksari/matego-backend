import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { AddProductInput } from './add.product.input';
import { EditProductInput } from './edit.product.input';
import { buildSchema, Ctx, Int, ID } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
@Resolver(Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
  @Query(returns => [Product])
  async products(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
  ) {
    return await this.productsService.getAll(offset, perPage);
  }

  @Query(returns => Product)
  async product(
    @Args({ name: 'productId', type: () => ID }) productId: number,
  ) {
    return await this.productsService.findById(productId);
  }

  @Mutation(returns => Product)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async addProduct(@Args('product') product: AddProductInput) {
    return await this.productsService.createProduct(product);
  }

  @Mutation(returns => Product)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async editProduct(
    @Args({ name: 'productId', type: () => ID }) productId: number,
    @Args('product') product: EditProductInput,
  ) {
    return await this.productsService.editProduct(productId, product);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteProduct(
    @Args({ name: 'productId', type: () => ID }) productId: number,
  ) {
    return await this.productsService.deleteProduct(productId);
  }
}
export const buildProductsSchema = async () => {
  return await buildSchema({
    resolvers: [ProductsResolver],
  });
};
