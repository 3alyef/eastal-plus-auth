import { InputType, Field } from '@nestjs/graphql';
import { locale, Locale } from 'src/lib/locale-views';

@InputType('CreateUserInput')
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  repeatPassword: string;

  @Field(() => String, { nullable: true, defaultValue: locale.defaultLocale })
  language?: Locale;
}

/*
	firstName: string;
	lastName: string;
	email: string;
	password: string; 
	repeatPassword: string;
	language?: Locale
*/
