import { Injectable } from '@nestjs/common';
import { AdminMod } from '../model/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { CryptService } from '../../crypt/crypt.service';
import { EntityService } from '../../shared/entity.abstract.service';

@Injectable()
export class AdminService extends EntityService<AdminMod>{
  constructor(
    @InjectModel(AdminMod) private adminRepository: typeof AdminMod,
    cryptService: CryptService,
  ) {
    super(adminRepository, cryptService);
  }
}
