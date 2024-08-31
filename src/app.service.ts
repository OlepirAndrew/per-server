import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
   getAppPath(): string {
    return join(__dirname, '..', 'client/browser', 'index.html');
  }
}
