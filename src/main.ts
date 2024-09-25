import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authenticate } from './db/DB';

async function bootstrap() {
  authenticate();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
