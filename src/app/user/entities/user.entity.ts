import { Schema } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export const UserSchema = new Schema<UserDto>(
    {
        username: { type: String, require: true },
        password: { type: String, require: true },
    },
    {
        timestamps: true,
    }
)
