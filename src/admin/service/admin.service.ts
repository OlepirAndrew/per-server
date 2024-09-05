import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminMod } from '../model/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { AdminDto } from '../dto/admin.dto';
import { CryptService } from '../../crypt/crypt.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminMod) private adminRepository: typeof AdminMod,
    private cryptService: CryptService,
  ) {}

  async getAll(page: number = 1, limit: number = 20) {

    const offset = (page - 1) * limit; // Смещение для пагинации

    const { rows: admins, count: totalItems
    } = await this.adminRepository.findAndCountAll({
      attributes: { exclude: ['password']}, limit, offset,
    })

   const adminItems = {
     admins,
     meta: {
       itemCount: totalItems,
     },
   }

    return adminItems;
  }

  async registration(dto: AdminDto) {
    const candidate = await this.getByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'User with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.checkUniqueEmailName(dto);

    const hashedPassword = await this.cryptService.getHashedPassword(dto);
    const createdAdmin: AdminMod = await this.create({
      ...dto,
      password: hashedPassword,
    });
    createdAdmin.password = undefined;
    return {
      status: HttpStatus.OK,
      message: 'Registration successful',
    };
  }

  async create(adminData: AdminDto) {
    return this.adminRepository.create(adminData);
  }

  private async getByEmail(email: string) {
    return this.adminRepository.findOne({
      where: { email },
    });
  }

  private async getByName(name: string) {
    return this.adminRepository.findOne({
      where: { name },
    });
  }

  getById(id: string) {
    return this.adminRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
  }

  private async checkUniqueEmailName(dto: AdminDto) {
    const candidateByEmail = await this.getByEmail(dto.email);
    if (candidateByEmail) {
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidateByName = await this.getByName(dto.name);
    if (candidateByName) {
      throw new HttpException(
        'User with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(admin: AdminMod) {
    const payload = {
      id: admin.id,
      email: admin.email,
    };

    return this.cryptService.makeToken(payload);
  }

  async login(dto: AdminDto) {
    const admin = await this.validateAdmin(dto);

    return this.generateToken(admin);
  }

  private async validateAdmin(dto: AdminDto) {
    const hashedAdmin = await this.getByEmail(dto.email);

    if (!hashedAdmin) {
      throw new UnauthorizedException({
        message: 'Invalid email or password',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const passwordEquals = await this.cryptService.compare(
      dto.password,
      hashedAdmin.password,
    );

    if (hashedAdmin && passwordEquals) {
      return hashedAdmin;
    }

    throw new UnauthorizedException({
      message: 'Invalid email or password',
      status: HttpStatus.UNAUTHORIZED,
    });
  }

  async editAdmin(id: string, dto: AdminDto) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    const updateData: Partial<AdminDto> = {};

    if (dto.email && dto.email !== admin.email) {
      updateData.email = dto.email;
    }
    if (dto.name && dto.name !== admin.name) {
      updateData.name = dto.name;
    }
    if (dto.password) {
      const hashedPassword = await this.cryptService.getHashedPassword(dto);
      if (hashedPassword !== admin.password) {
        updateData.password = hashedPassword;
      }
    }

    if (Object.keys(updateData).length > 0) {
      await admin.update(updateData);
    }

    return {
      status: HttpStatus.OK,
      message: 'Editing successful',
    };
  }

  async deleteAdmin(id: string) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    await admin.destroy();

    return {
      status: HttpStatus.OK,
      message: 'Admin deleted successfully',
    };
  }
}
