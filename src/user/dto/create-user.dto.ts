import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PasswordMatches } from 'src/user/decorators/PasswordMatches.decorator';
import { Gender, Provider } from '../types/user.enum';
/*import { locale, Locale } from 'src/lib/locale-views';
language?: Locale = locale.defaultLocale;*/

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @MinLength(8, { message: 'Password must be at least 6 characters long' })
  @PasswordMatches('password', { message: 'Passwords do not match' })
  repeat_password?: string;

  @IsNotEmpty({ message: 'provider is required' })
  provider: Provider;

  provider_id?: string;

  gender?: Gender;
}
