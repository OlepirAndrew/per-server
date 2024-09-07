import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CryptService } from '../../crypt/crypt.service';
import { PerformerMod } from '../model/performer.model';
import { EntityService } from '../../shared/entity.abstract.service';

@Injectable()
export class PerformersService extends EntityService<PerformerMod>{
  constructor(
    @InjectModel(PerformerMod) private performerRepository: typeof PerformerMod,
    cryptService: CryptService,
  ) {
    super(performerRepository, cryptService);
  }
}
