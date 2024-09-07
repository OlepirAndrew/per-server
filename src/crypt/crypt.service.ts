import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptService {
  constructor(private jwtService: JwtService) {}

  async getHashedPassword<T extends {password: string}>(dto: T) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(dto.password, salt);
  }

  async makeToken(payload: object) {
    return { token: this.jwtService.sign(payload) };
  }

  async compare(dtoPass: string, adminPass: string) {
    return bcrypt.compare(dtoPass, adminPass);
  }
}
