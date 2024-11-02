import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneSchema } from './entities/phone.entity';
import { UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Phone', schema: PhoneSchema },{ name: 'User', schema: UserSchema }]),UserModule
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports:[PhoneService]
})
export class PhoneModule {}
