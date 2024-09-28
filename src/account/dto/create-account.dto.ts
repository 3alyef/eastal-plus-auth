import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  // @IsString({ message: 'Biography format incorrect' })
  // biography?: string;
}
