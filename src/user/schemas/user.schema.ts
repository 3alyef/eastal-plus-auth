import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { userStatus } from '../enum/userStatus.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
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

  @Prop({ type: String, required: true })
  account_id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
