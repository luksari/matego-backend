import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ReviewsModule } from './reviews/reviews.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
          include: [UsersModule],
        }),
        ReviewsModule,
      ],
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
