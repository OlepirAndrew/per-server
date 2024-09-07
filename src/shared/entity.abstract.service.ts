import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CryptService } from '../crypt/crypt.service';

interface ICommonEntityWithPassword extends Omit<ICommonEntity, 'password'> {
  password: string;
}

interface ICommonEntity {
  id?: string;
  nickName?: string;
  email: string;
  name: string;
  password?: string;
}

export abstract class EntityService<T>{
  protected constructor(
    protected readonly repository: {
      findAndCountAll: Function;
      create: Function;
      findOne: Function;
      update: Function;
      destroy: Function;
    },
    protected readonly cryptService: CryptService
  ) {}

  private ENTITY_FIELDS = ['email', 'name', 'nickName']

  async create<T>(dto: T) {
    return this.repository.create(dto);
  }

  async registration<T extends ICommonEntityWithPassword>(dto: T) {
    await this.checkUniqueFields(dto);
    const hashedPassword = await this.cryptService.getHashedPassword(dto);
    const createdEntity = await this.create({
      ...dto,
      password: hashedPassword,
    });
    createdEntity.password = undefined;

    return {
      status: HttpStatus.OK,
      message: 'Registration successful',
    };
  }

  async getBy(name: string, value: string) {
    return this.repository.findOne({
      where: { [name]: value },
    });
  }

  private async checkUniqueFields<T extends ICommonEntity>(dto: T) {

    for (const field of this.ENTITY_FIELDS) {
      if (dto[field]) {
        const candidate = await this.getBy(field, dto[field]);
        if (candidate) {
          throw new HttpException(
            `User with that ${field} already exists`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  async getById(id: string) {
    return this.repository.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async getAll(page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;

    const { rows: entities, count: totalItems } =
      await this.repository.findAndCountAll({
        attributes: { exclude: ['password'] },
        limit,
        offset,
      });

    return {
      entities,
      meta: {
        itemCount: totalItems,
      },
    };
  }

  async generateToken<T extends ICommonEntity>(admin: T) {
    const payload = {
      id: admin.id,
      email: admin.email,
    };

    return this.cryptService.makeToken(payload);
  }

  async login<T extends ICommonEntity>(dto: T) {
    const admin = await this.validate(dto);

    return this.generateToken(admin);
  }

  private async validate<T extends ICommonEntity>(dto: T) {
    const hashedEntity = await this.getBy('email', dto.email);

    if (!hashedEntity) {
      throw new UnauthorizedException({
        message: 'Invalid email or password',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const passwordEquals = await this.cryptService.compare(
      dto.password,
      hashedEntity.password,
    );

    if (hashedEntity && passwordEquals) {
      return hashedEntity;
    }

    throw new UnauthorizedException({
      message: 'Invalid email or password',
      status: HttpStatus.UNAUTHORIZED,
    });
  }

  async editEntity<T extends ICommonEntityWithPassword>(id: string, dto: T) {
    const admin = await this.getById(id);

    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    const updateData: Partial<T> = {};

    this.ENTITY_FIELDS.forEach((field) => {
      if (dto[field] && dto[field] !== admin[field]) {
        updateData[field] = dto[field];
      }
    });

    if (dto.password) {
      const hashedPassword = await this.cryptService.getHashedPassword(dto);
      if (hashedPassword !== admin.password) {
        updateData.password = hashedPassword;
      }
    }

    console.log('updateData', updateData);
    if (Object.keys(updateData).length > 0) {
      await admin.update(updateData);
    }

    return {
      status: HttpStatus.OK,
      message: 'Editing successful',
    };
  }

  async delete(id: string) {
    const entity = await this.getById(id);

    if (!entity) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    await entity.destroy();

    return {
      status: HttpStatus.OK,
      message: 'Admin deleted successfully',
    };
  }
}