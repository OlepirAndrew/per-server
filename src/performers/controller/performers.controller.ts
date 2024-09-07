import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { PerformersService } from '../service/performers.service';
import { PerformerDto } from '../dto/performer.dto';
import { AdminDto } from '../../admin/dto/admin.dto';
import { AdminGuard } from '../../admin/guard/admin.guard';

@UseGuards(AdminGuard)
@Controller('/admin')
export class PerformersController {
  constructor(private readonly performersService: PerformersService) {}

  @Get('/performers')
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.performersService.getAll(page, limit);
  }

  @Get('/performers/:id')
  getById(@Param('id') id: string) {
    return this.performersService.getById(id);
  }

  @Post('/performers/registration')
  registration(@Body() dto: PerformerDto) {
    return this.performersService.registration(dto);
  }

  @Put('/performers/:id/edit')
  editAdmin(@Param('id') id: string, @Body() dto: AdminDto) {

    return this.performersService.editEntity(id, dto);
  }

  @Delete('/performers/:id/delete')
  deleteAdmin(@Param('id') id: string) {
    return this.performersService.delete(id);
  }
}
