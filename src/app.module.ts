import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PerformersModule } from './performers/performers.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/browser'), // Путь к статическим файлам Angular
      exclude: ['/api*'],
    }),
    PerformersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
