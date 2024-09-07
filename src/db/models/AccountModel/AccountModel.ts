import { Schema, model, Model } from "mongoose";
import { IAccount } from "../../../interfaces/IModels";

const AccountScheme = new Schema<IAccount>({
  userId: { type: String, required: true },
	createdIn: { type: Date, required: true },
	accountType: { type: String, required: true},
	lastUpdateIn: { type: Date, required: true },
});

const AccountModel: Model<IAccount> = model<IAccount>("AccountModel", AccountScheme);

export default AccountModel;
