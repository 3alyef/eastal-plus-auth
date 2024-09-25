import { Schema, model, Model } from 'mongoose';
import { IAccount } from '../IModels';

const AccountScheme = new Schema<IAccount>(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
    recoveryEmail: { type: String, required: false },
    language: { type: String, required: true, default: 'en' },
  },
  {
    timestamps: true,
  },
);

// accountType: "", // normal | pro | admin

const AccountModel: Model<IAccount> = model<IAccount>(
  'AccountModel',
  AccountScheme,
);

export default AccountModel;
