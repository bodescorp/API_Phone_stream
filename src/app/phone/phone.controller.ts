import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TenantInterceptor } from '../tenant/middleware/tenant.interceptor';
import { PhoneDto } from './dto/phone.dto';
import { UpdatePhoneStatusDto } from './dto/update-status-phone.dto';

@UseGuards(AuthGuard)
@UseInterceptors(TenantInterceptor)
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) { }

  @Post()
  async create(@Body() createPhoneDto: CreatePhoneDto): Promise<PhoneDto> {
    return this.phoneService.create(createPhoneDto);
  }

  @Get()
  async findAll(): Promise<PhoneDto[]> {
    return await this.phoneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PhoneDto> {
    return await this.phoneService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto): Promise<PhoneDto> {
    return this.phoneService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PhoneDto> {
    return this.phoneService.remove(id);
  }

  @Put(':id')
  async markAsStolen(@Param('id') id: string, @Body() updatePhoneStatusDto: UpdatePhoneStatusDto): Promise<PhoneDto> {
    return await this.phoneService.markAsStolen(id, updatePhoneStatusDto)
  }
}
