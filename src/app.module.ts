import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PerformersModule } from './performers/performers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AdminMod } from './admin/admin.model';
import { CryptModule } from './crypt/crypt.module';

@Module({
  imports: [
    PerformersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/browser'), // Путь к статическим файлам Angular
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [AdminMod],
      autoLoadModels: true,
    }),
    AdminModule,
    CryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
