import { Module } from '@nestjs/common';
import { RanksService } from './ranks.service';

@Module({
  providers: [RanksService]
})
export class RanksModule {}
