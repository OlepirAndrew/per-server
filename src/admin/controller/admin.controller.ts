import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
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
  getAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.adminService.getAll(page, limit);
  }

  @Get('/admins/:id')
  getById(@Param('id') id: string) {
    return this.adminService.getById(id);
  }

  @Put('/admins/:id/edit')
  editAdmin(@Param('id') id: string, @Body() dto: AdminDto) {

    return this.adminService.editEntity(id, dto);
  }

  @Post('/admins/registration')
  registration(@Body() dto: AdminDto) {
    return this.adminService.registration(dto);
  }

  @Delete('/admins/:id/delete')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
