import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminModule } from './admin/admin.module';
import { CryptModule } from './crypt/crypt.module';
import { PerformersModule } from './performers/performers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/browser'), // Путь к статическим файлам Angular
      exclude: ['/api*'],
    }),
    AdminModule,
    CryptModule,
    PerformersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
