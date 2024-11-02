import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() createAuthDto: CreateAuthDto): Promise<ResponseAuthDto>  {
    return this.authService.signIn(createAuthDto);
  }
}
