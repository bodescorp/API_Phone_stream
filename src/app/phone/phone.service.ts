import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneDto } from './dto/phone.dto';
import { TenantService } from '../tenant/tenant.service';
import { UserDto } from '../user/dto/user.dto';
import { UpdatePhoneStatusDto } from './dto/update-status-phone.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel('Phone') private readonly phoneModel: Model<PhoneDto>,
    @InjectModel('User') private readonly userModel: Model<UserDto>,
    private readonly tenantService: TenantService,
    private readonly redisService: RedisService,

  ) { }
  async create(createPhoneDto: CreatePhoneDto): Promise<PhoneDto> {


    const findUser = await this.userModel.findOne({ username: this.tenantService.getTenant().username }).exec()

    if (!findUser) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }

    const newPhone = new this.phoneModel({
      phone_model: createPhoneDto.phone_model,
      phone_number: createPhoneDto.phone_number,
      brand: createPhoneDto.brand,
      imei: createPhoneDto.imei,
      userId: findUser._id
    })

    return await newPhone.save()

  }

  async findAll(): Promise<PhoneDto[]> {
    return await this.phoneModel.find({ userId: this.tenantService.getTenant()._id }).exec()
  }

  async markAsStolen(id: string, updatePhoneStatusDto: UpdatePhoneStatusDto): Promise<PhoneDto> {
    const phoneStolen = await this.phoneModel.findOneAndUpdate({ _id: id },
      { ...updatePhoneStatusDto, isStolen: true, status: 'Roubado' }, // Atualizando também o status para "Roubado"
      { new: true }  // Retorna o documento atualizado
    ).exec();

    // Publica a informação no Redis
    await this.redisService.publish('phone-stolen', phoneStolen);

    return this.findOne(id)
  }

  async findOne(id: string): Promise<PhoneDto> {
    return await this.phoneModel.findById(id).exec()
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto): Promise<PhoneDto> {
    await this.phoneModel.updateOne({ _id: id }, updatePhoneDto).exec()
    return this.findOne(id)

  }

  async remove(id: string): Promise<PhoneDto> {
    return await this.phoneModel.findByIdAndDelete(id).exec();
  }
}
