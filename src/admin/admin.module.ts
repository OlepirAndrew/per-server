import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminMod } from './model/admin.model';
import { CryptModule } from '../crypt/crypt.module';
import { AdminLoginController } from './controller/admin-login.controller';

@Module({
  providers: [AdminService],
  controllers: [AdminController, AdminLoginController],
  imports: [SequelizeModule.forFeature([AdminMod]), CryptModule],
})
export class AdminModule {}
