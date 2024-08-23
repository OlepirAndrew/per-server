import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminMod } from './admin.model';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 200, type: AdminMod })
  @Post()
  create(@Body() adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [AdminMod] })
  @Get()
  getAll() {
    return this.adminService.getAll();
  }
}
