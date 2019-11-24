import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import { Profile } from './profile.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
