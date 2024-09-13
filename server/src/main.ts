import { join } from 'path';

import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: process.env.CORS_ORIGIN , methods: '*'});

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

  await app.listen(process.env.SERVER_PORT)
}

void bootstrap();
