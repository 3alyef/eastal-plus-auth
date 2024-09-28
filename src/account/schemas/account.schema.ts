import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Locale, locale } from 'src/lib/locale-views';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Account extends Document {
  @Prop({ type: String, required: true, ref: 'User' })
  user_id: string;

  @Prop({
    type: String,
    default: locale.defaultLocale,
  })
  default_language: Locale;

  @Prop({ type: String, required: true, unique: true }) // Adicionando username
  user_name: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  biography?: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
