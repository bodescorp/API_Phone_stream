import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { ResponseCreateUserDto } from './dto/response-create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<ResponseCreateUserDto> {
    const newUser = new this.userModel(createUserDto)

    newUser.username = createUserDto.username
    newUser.password = bcryptHashSync(newUser.password, 10);

    const { id, username } = await newUser.save();

    return { id, username };
  }

  async findUserName(userName: string): Promise<ResponseCreateUserDto | null> {
    const userFound = await this.userModel.findOne({
      username: userName
    }).exec();

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
    };
  }
}
