import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AddManufacturerInput } from './add.manufacturer.input';
import { EditManufacturerInput } from './edit.manufacturer.input';
import { GqlAuthGuard } from '../auth/guards/gql.auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql.roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../auth/guards/roles/user.roles';
import { ID, Arg, Int } from 'type-graphql';
import { ErrorMessages } from '../common/error.messages';
import { ManufacturersResponse } from './manufacturers.response';
import { OrderEnum } from '../common/enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Resolver(Manufacturer)
export class ManufacturersResolver {
  constructor(private readonly manufacturersService: ManufacturersService) {}
  @Query(returns => ManufacturersResponse)
  async manufacturers(
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset: number,
    @Args({ name: 'perPage', type: () => Int, nullable: true }) perPage: number,
    @Args({ name: 'orderBy', type: () => String, nullable: true })
    orderBy: string,
    @Args({ name: 'order', type: () => String, nullable: true })
    order: OrderEnum,
    @Args({ name: 'searchByName', type: () => String, nullable: true })
    searchByName: string,
  ) {
    return await this.manufacturersService.getAll(
      offset,
      perPage,
      orderBy,
      order,
      searchByName,
    );
  }

  @Query(returns => Manufacturer)
  async manufacturer(
    @Args({ name: 'manufacturerId', type: () => ID }) manufactuerId: number,
  ) {
    const manufacturer = await this.manufacturersService.findById(
      manufactuerId,
    );
    if (!manufacturer) {
      throw new NotFoundException(ErrorMessages.ManufacturerNotFound);
    }
    return manufacturer;
  }
  @Mutation(returns => Manufacturer)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin, UserRoles.user)
  async addManufacturer(
    @Args('manufacturer') manufacturer: AddManufacturerInput,
    @CurrentUser() user: User,
  ) {
    return await this.manufacturersService.createManufacturer(
      manufacturer,
      user,
    );
  }
  @Mutation(returns => Manufacturer)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async editManufacturer(
    @Args({ name: 'manufacturerId', type: () => ID }) manufacturerId: number,
    @Args('manufacturer') manufacturer: EditManufacturerInput,
  ) {
    return await this.manufacturersService.updateManufacturer(
      manufacturerId,
      manufacturer,
    );
  }
  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Roles(UserRoles.admin)
  async deleteManufacturer(
    @Args({ name: 'manufacturerId', type: () => ID }) manufacturerId: number,
  ) {
    return await this.manufacturersService.deleteManufacturer(manufacturerId);
  }
}
