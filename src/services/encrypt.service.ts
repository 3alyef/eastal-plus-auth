import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

@Injectable()
export default class EncryptService {
  async hashData(data: string): Promise<string> {
    const randomSalt = randomInt(10, 16);
    const dataEncrypted = await hash(data, randomSalt);
    if (!dataEncrypted) {
      throw new HttpException(
        'Encrypt error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return dataEncrypted;
  }

  async verifyData(data: string, dataHashed: string): Promise<boolean> {
    return await compare(data, dataHashed);
  }
}
