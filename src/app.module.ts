import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [GraphqlModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
