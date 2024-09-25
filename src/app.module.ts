import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [GraphqlModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
