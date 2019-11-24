import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { AddProductInput } from './add.product.input';
import { EditProductInput } from './edit.product.input';
import { buildSchema, Ctx, Int, ID } from 'type-graphql';
import { Context } from 'apollo-server-core';
@Resolver(Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
  @Query(returns => [Product])
  async products() {
    return await this.productsService.getAll();
  }

  @Query(returns => Product)
  async product(@Args('productId') productId: number) {
    return await this.productsService.findById(productId);
  }

  @Mutation(returns => Product)
  async addProduct(@Args('product') product: AddProductInput) {
    return await this.productsService.createProduct(product);
  }

  @Mutation(returns => Product)
  async editProduct(
    @Args('productId') productId: number,
    @Args('product') product: EditProductInput,
  ) {
    return await this.productsService.editProduct(productId, product);
  }

  @Mutation(returns => Boolean)
  async deleteProduct(@Args('productId') productId: number) {
    return await this.productsService.deleteProduct(productId);
  }
}
export const buildProductsSchema = async () => {
  return await buildSchema({
    resolvers: [ProductsResolver],
  });
};
