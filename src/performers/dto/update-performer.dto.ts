import { PartialType } from '@nestjs/swagger';
import { PerformerDto } from './performer.dto';

export class UpdatePerformerDto extends PartialType(PerformerDto) {}
