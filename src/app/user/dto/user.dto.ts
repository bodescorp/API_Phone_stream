import { Document } from 'mongoose';
import { PhoneDto } from 'src/app/phone/dto/phone.dto';

export class UserDto extends Document{
    id?:string
    username: string;
    password: string;
}