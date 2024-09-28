import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';
import { CreateUserNameService } from './services/createUserName.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly createUserNameService: CreateUserNameService,
  ) {}

  async create({ user_id, name }: CreateAccountDto): Promise<Account> {
    const user_name = await this.createUserNameService.createUserName(name);

    const newAccount = new this.accountModel({
      user_id,
      name,
      user_name,
    });

    return newAccount.save();
  }
}
