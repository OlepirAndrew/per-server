import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'abracadabra_secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CryptService],
  exports: [CryptService],
})
export class CryptModule {}
