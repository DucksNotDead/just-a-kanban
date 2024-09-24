import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import 'dotenv/config'

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'media'), {
    prefix: '/media/',
  });

  const config = new DocumentBuilder()
    .setTitle('Kanban API')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3005, 'localhost', () => {})
}

void bootstrap();
