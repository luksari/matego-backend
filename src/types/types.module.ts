import { Module } from '@nestjs/common';
import { TypesService } from './types.service';

@Module({
  providers: [TypesService]
})
export class TypesModule {}
