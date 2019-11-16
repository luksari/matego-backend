import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';

@Module({
  providers: [ManufacturersService]
})
export class ManufacturersModule {}
