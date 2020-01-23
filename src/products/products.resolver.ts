import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { AddProductInput } from './add.product.input';
import { EditProductInput } from './edit.product.input';
import { buildSchema, Ctx, Int, ID } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ProductsResponse } from './products.response';
import { OrderEnum } from '../common/enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { PersonalizedProductsInput } from './personalized.products.input';

@Resolver(Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
  @Query(returns => ProductsResponse)
  async products(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
    @Args({ name: 'orderBy', type: () => String, nullable: true })
    orderBy: string,
    @Args({ name: 'order', type: () => String, nullable: true })
    order: OrderEnum,
    @Args({ name: 'searchByName', type: () => String, nullable: true })
    searchByName: string,
    @Args({ name: 'personalizeForUser', type: () => ID, nullable: true })
    personalizeForUser: number,
    @Args({
      name: 'personalizeBy',
      type: () => PersonalizedProductsInput,
      nullable: true,
    })
    personalizeBy?: PersonalizedProductsInput,
  ) {
    return await this.productsService.getAll(
      offset,
      perPage,
      orderBy,
      order,
      searchByName,
      personalizeForUser,
      personalizeBy,
    );
  }

  @Query(returns => Product)
  async product(
    @Args({ name: 'productId', type: () => ID }) productId: number,
    @Args({ name: 'personalizeFor', type: () => ID, nullable: true })
    userId: number,
  ) {
    return await this.productsService.findById(productId, userId);
  }

  @Mutation(returns => Product)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async addProduct(
    @Args('product') product: AddProductInput,
    @CurrentUser() user: User,
  ) {
    return await this.productsService.createProduct(product, user);
  }

  @Mutation(returns => Product)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async editProduct(
    @Args({ name: 'productId', type: () => ID }) productId: number,
    @Args('product') product: EditProductInput,
    @CurrentUser() user: User,
  ) {
    return await this.productsService.editProduct(productId, product, user);
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
