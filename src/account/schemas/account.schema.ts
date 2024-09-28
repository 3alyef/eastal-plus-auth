import { Prop, Schema } from '@nestjs/mongoose';
import { Locale, locale } from 'src/lib/locale-views';

@Schema({ timestamps: true })
export class Account extends Document {
  @Prop({ type: String, required: true })
  provider: string;

  @Prop({ type: String, required: true })
  provider_id: string;

  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: Boolean, required: true })
  is_verified: boolean;

  @Prop({
    type: String,
    enum: Object.values(locale),
    default: locale.defaultLocale,
  })
  default_language: Locale;
}
