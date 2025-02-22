import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config/envConfig';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Swagger Notes API')
    .setDescription('Swagger Example API API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:3000/api/docs
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  await app.listen(3000);
}
bootstrap();
