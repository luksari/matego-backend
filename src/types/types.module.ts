import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { Type } from './type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesResolver } from './types.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [TypesService, TypesResolver],
})
export class TypesModule {}
