import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export default class RegisterUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUserAccount({ createUserDto }: RegisterUserDto) {
    const session = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      const newUser = new this.userModel(createUserDto);
      const user = await newUser.save();

      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'User creation failed. Rolled back.',
      );
    }
  }
}
