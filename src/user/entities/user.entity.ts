import { IsUUID } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';

export class User extends CreateUserDto {
  @IsUUID('4', { message: 'Invalid ID format' }) // Usando UUID v4
  id: string;
}
