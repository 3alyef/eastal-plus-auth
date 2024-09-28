import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '';

  const PORT = Number(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ALLOW_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // cookies ou sessões
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
