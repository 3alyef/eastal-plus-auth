import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from '../schemas/account.schema';

@Injectable()
export class CreateUserNameService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async createUserName(name: string): Promise<string> {
    let user_name = '';
    while (true) {
      user_name = this.generateRandomKey(name);

      const isUserNameTaken: boolean = await this.certifyUserId(user_name);

      if (!isUserNameTaken) {
        break;
      }
    }

    return user_name;
  }

  private generateRandomKey(name: string): string {
    const rdAlf = 'abcdefghijklmnopqrstuvwxyz';
    const random_number = Math.floor(Math.random() * 1000);

    const randomIndices = this.generateRandomIndex(2, rdAlf.length);

    const randomNames = randomIndices.map((index) => rdAlf[index]).join('_');

    return `${name}_${random_number}_${randomNames}`;
  }

  private generateRandomIndex(quant: number, adN: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i <= quant; i++) {
      const randomIndex = Math.floor(Math.random() * adN);
      numbers.push(randomIndex);
    }

    return numbers;
  }

  private async certifyUserId(user_name: string): Promise<boolean> {
    const userExists = await this.accountModel.exists({ user_name });

    return userExists ? true : false;
  }
}
