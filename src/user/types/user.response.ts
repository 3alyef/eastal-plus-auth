import { userStatus } from './userStatus.enum';

export class UserByEmail {
  first_name: string;
  roles: string[];
  status: userStatus;
}
