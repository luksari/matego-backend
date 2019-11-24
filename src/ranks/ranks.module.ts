import { Module } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './rank.entity';
import { RanksResolver } from './ranks.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  providers: [RanksService, RanksResolver],
})
export class RanksModule {}
