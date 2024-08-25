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

  async getAll() {
    const admins: AdminMod[] = await this.adminRepository.findAll();

    return admins;
  }

  async registration(dto: AdminDto) {
    const candidate = await this.getByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'User with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.cryptService.getHashedPassword(dto);
    const createdAdmin: AdminMod = await this.create({
      ...dto,
      password: hashedPassword,
    });
    createdAdmin.password = undefined;
    return createdAdmin;
  }

  async create(adminData: AdminDto) {
    return this.adminRepository.create(adminData);
  }

  private async getByEmail(email: string) {
    return this.adminRepository.findOne({
      where: { email },
    });
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
        message: 'Email Address is not Registered',
      });
    }

    const passwordEquals = await this.cryptService.compare(
      dto.password,
      hashedAdmin.password,
    );

    if (hashedAdmin && passwordEquals) {
      return hashedAdmin;
    }

    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }

  getById(id: string) {
    return this.adminRepository.findOne({
      where: { id },
    });
  }

  async editAdmin(id: string, dto: AdminDto) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    if (dto.password) {
      dto.password = await this.cryptService.getHashedPassword(dto);
    }

    await admin.update(dto);
    admin.password = undefined; // Do not return password in response

    return admin;
  }
}
