import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { userStatus } from '../types/userStatus.enum';
import { Gender } from '../types/user.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  provider: string;

  @Prop({
    type: String,
    default: function () {
      return this._id.toString();
    },
  })
  provider_id: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: false })
  last_name: string;

  @Prop({ type: Date })
  last_login: Date;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @Prop({
    type: String,
    enum: Object.values(userStatus),
    default: userStatus.ACTIVE,
  })
  status: userStatus;

  @Prop({ type: [String] })
  account_id: string[];

  @Prop({ type: String, enum: Object.values(Gender), default: 'undefined' })
  gender: Gender;

  @Prop({ type: Boolean, default: false })
  is_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
