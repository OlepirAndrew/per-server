import {
  Body,
  Controller,
  Get, Param,
  Post, Put,
  Session,
  UseGuards
} from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { AdminDto } from '../dto/admin.dto';
import { AdminGuard } from '../guard/admin.guard';

@UseGuards(AdminGuard)
@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // @Get()
  // test(@Session() session: Record<string, any>) {
  //   session.visits = session.visits ? session.visits + 1 : 1;
  //   console.log('SESSIONS', session);
  //   return session.visits;
  // }

  @Get('/admins')
  getAll() {
    return this.adminService.getAll();
  }

  @Get('/admins/:id')
  getById(@Param('id') id: string) {
    return this.adminService.getById(id);
  }

  @Put('/admins/:id/edit')
  editAdmin(@Param('id') id: string, @Body() dto: AdminDto) {
    return this.adminService.editAdmin(id, dto);
  }

  @Post('/admins/registration')
  registration(@Body() dto: AdminDto) {
    console.log('registration', dto);
    return this.adminService.registration(dto);
  }
}
