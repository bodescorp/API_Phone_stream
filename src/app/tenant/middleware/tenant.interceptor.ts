import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../../user/dto/user.dto';
import { TenantService } from '../tenant.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDto>,
    private readonly tenetService: TenantService
  ) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const phoneUser = await this.UserModel.findById({ _id: user.sub })

    if (!phoneUser) {
      throw new HttpException("User not a have Phone", HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }

    this.tenetService.setTenant(phoneUser);



    return next.handle();
  }
}
