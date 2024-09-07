import { Module } from '@nestjs/common';
import { PerformersService } from './service/performers.service';
import { PerformersController } from './controller/performers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CryptModule } from '../crypt/crypt.module';
import { PerformerMod } from './model/performer.model';

@Module({
  controllers: [PerformersController],
  providers: [PerformersService],
  imports: [SequelizeModule.forFeature([PerformerMod]), CryptModule],
})
export class PerformersModule {}
