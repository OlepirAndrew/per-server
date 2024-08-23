import { Injectable } from '@nestjs/common';
import { AdminMod } from './admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminMod) private adminRepository: typeof AdminMod,
  ) {}

  async create(dto: CreateAdminDto) {
    const admin = await this.adminRepository.create(dto);
    return admin;
  }

  async getAll() {
    const admins = await this.adminRepository.findAll();

    return admins;
  }
}
