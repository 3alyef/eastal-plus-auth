import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import EncryptService from './services/encrypt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.example'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL || ''),
    UserModule,
    AuthModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptService],
  exports: [EncryptService],
})
export class AppModule {}
