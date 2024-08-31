import { Body, Controller, Post } from '@nestjs/common';
import { AdminDto } from '../dto/admin.dto';
import { AdminService } from '../service/admin.service';

@Controller('/admin-login')
export class AdminLoginController {
  constructor(private adminService: AdminService) {}

  @Post()
  async login(@Body() dto: AdminDto) {
    return this.adminService.login(dto);
  }
}
