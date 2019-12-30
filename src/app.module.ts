import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ReviewsModule } from './reviews/reviews.module';
import { TypesModule } from './types/types.module';
import { ProductsModule } from './products/products.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { RanksModule } from './ranks/ranks.module';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      playground: true,
      autoSchemaFile: 'schema.gql',
      cors: true,
      engine: {
        apiKey: process.env.ENGINE_API_KEY,
      },
      include: [
        UsersModule,
        ProductsModule,
        ReviewsModule,
        ManufacturersModule,
        TypesModule,
        RanksModule,
        TypesModule,
      ],
    }),
    ReviewsModule,
    TypesModule,
    ProductsModule,
    ManufacturersModule,
    RanksModule,
  ],
  controllers: [AppController],
  providers: [UploadService],
})
export class AppModule {}
