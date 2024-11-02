import { Module } from '@nestjs/common';
import { ViewsUserController } from './views.user.controller';
import { registerHbsHelpers } from './helpers/hbs-helper';
import { UserService } from '../user/user.service';
import { PhoneService } from '../phone/phone.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/entities/user.entity';
import { PhoneSchema } from '../phone/entities/phone.entity';
import { UserModule } from '../user/user.module';
import { PhoneModule } from '../phone/phone.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ViewsPhoneController } from './views.phone.controller';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {
        name: 'User', schema: UserSchema

      },
      {
        name: 'Phone', schema: PhoneSchema

      }
    ]
  ),
    UserModule, PhoneModule, AuthModule],
  controllers: [ViewsUserController,ViewsPhoneController],
  providers: [UserService, PhoneService, AuthService]
})
export class ViewsModule {
  constructor() {
    registerHbsHelpers();
  }
}
