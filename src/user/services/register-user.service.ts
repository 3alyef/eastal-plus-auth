import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export default class RegisterUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly accountService: AccountService,
  ) {}

  async createUserAccount({ createUserDto }: RegisterUserDto) {
    const { first_name, last_name } = createUserDto;

    const session = await this.userModel.db.startSession();
    session.startTransaction();

    try {
      const newUser = new this.userModel(createUserDto);
      const user = await newUser.save({ session });

      await this.accountService.create({
        name: `${first_name}_${last_name || ''}`,
        provider: '',
        provider_id: '',
        user_id: newUser._id,
        session,
      });

      await session.commitTransaction();
      return user;
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      throw new InternalServerErrorException(
        'User creation failed. Rolled back.',
      );
    } finally {
      session.endSession();
    }
  }
}
