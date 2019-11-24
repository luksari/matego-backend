import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersResolver } from './manufacturers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer, User])],
  providers: [ManufacturersService, ManufacturersResolver],
})
export class ManufacturersModule {}
