import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorMessages } from './common/error.messages';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const swaggerOptions = new DocumentBuilder()
    .setTitle('YerbApp API')
    .setVersion('0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  swaggerDocument.info = {
    description: `Error messages: \n ${ErrorMessages.UserExists}, ${ErrorMessages.UserNotFound}, 
    ${ErrorMessages.WrongPassword}, 
    ${ErrorMessages.ManufacturerNotFound},
    ${ErrorMessages.TypeNotFound}`,
  };
  SwaggerModule.setup('api', app, swaggerDocument);
  await app.listen(4000);
}
bootstrap();
