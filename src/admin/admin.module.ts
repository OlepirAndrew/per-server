import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminMod } from './admin.model';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [SequelizeModule.forFeature([AdminMod])],
})
export class AdminModule {}
