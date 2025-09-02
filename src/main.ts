import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true
      }),
  );
  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('API fot products in shop')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
