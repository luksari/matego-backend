import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { NotFoundException } from '@nestjs/common';
import { AddManufacturerInput } from './add.manufacturer.input';
import { EditManufacturerInput } from './edit.manufacturer.input';

@Resolver(Manufacturer)
export class ManufacturersResolver {
  constructor(private readonly manufacturersService: ManufacturersService) {}
  @Query(returns => [Manufacturer])
  async manufacturers() {
    return await this.manufacturersService.getAll();
  }
  @Query(returns => Manufacturer)
  async manufacturer(@Args('manufacturerId') manufactuerId: number) {
    const manufacturer = await this.manufacturersService.findById(
      manufactuerId,
    );
    if (!manufacturer) {
      throw new NotFoundException('Manufacturer not found');
    }
    return manufacturer;
  }
  @Mutation(returns => Manufacturer)
  async addManufacturer(
    @Args('manufacturer') manufacturer: AddManufacturerInput,
  ) {
    return await this.manufacturersService.createManufacturer(manufacturer);
  }
  @Mutation(returns => Manufacturer)
  async editManufacturer(
    @Args('manufacturerId') manufacturerId: number,
    @Args('manufacturer') manufacturer: EditManufacturerInput,
  ) {
    return await this.manufacturersService.updateManufacturer(
      manufacturerId,
      manufacturer,
    );
  }
  @Mutation(returns => Boolean)
  async deleteManufacturer(
    @Args('manufacturerId') manufacturerId: number,
    @Args('manufacturer') manufacturer: EditManufacturerInput,
  ) {
    return await this.manufacturersService.deleteManufacturer(manufacturerId);
  }
}
