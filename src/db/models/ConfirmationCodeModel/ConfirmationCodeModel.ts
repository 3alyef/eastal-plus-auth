import { Schema, model, Model } from "mongoose";
import { IConfirmationCode } from "../../../interfaces/IModels";

const expires = Number(process.env.CONFIRM_CODE_EXPIRES) || 300; // 300 sec === 5 min

const confirmationCodeSchema = new Schema<IConfirmationCode>({
	email: { type: String, required: true },
	code: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires },
});

const ConfirmationCodeModel: Model<IConfirmationCode> = model('ConfirmationCode', confirmationCodeSchema);

export default ConfirmationCodeModel;