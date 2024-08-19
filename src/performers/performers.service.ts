import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class PerformersService {
  getPerformers() {
    const filePath = join(__dirname, '..', '..', 'moc', 'performers.json');
    const jsonData = readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  }
}
