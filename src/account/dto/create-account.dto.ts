import { IsNotEmpty, IsString } from 'class-validator';
import { ClientSession } from 'mongoose';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  @IsNotEmpty({ message: 'provider is required' })
  provider: string;

  @IsNotEmpty({ message: 'provider_id is required' })
  provider_id: string;

  session?: ClientSession;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  // @IsString({ message: 'Biography format incorrect' })
  // biography?: string;
}
