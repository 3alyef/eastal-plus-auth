import { IsEmail, IsString } from 'class-validator';

export class FindUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString({ message: 'Invalid user_name type' })
  user_name: string;
}
