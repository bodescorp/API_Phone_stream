import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from '../user/dto/user.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ResponseAuthDto } from './dto/response-auth.dto';


@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }
  async signIn(createAuthDto: CreateAuthDto): Promise<ResponseAuthDto> {
    const foundUser = await this.userModel.findOne({
      username: createAuthDto.username
    }).exec();



    if (!foundUser || !bcryptCompareSync(createAuthDto.password, foundUser.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}

