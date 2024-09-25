import { Locale } from 'src/lib/locale-views';

export type accountType = 'normal' | 'pro';

export interface CheckEmailRes {
  email: string;
  accountType: accountType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccount extends CheckEmailRes {
  userId: string;
  password: string;
  recoveryEmail: string;
  language: Locale;
}

export interface IUserAbout {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  updatedAt: Date;
}

export interface IConfirmationCode {
  email: string;
  code: string;
  createdAt: Date;
}
