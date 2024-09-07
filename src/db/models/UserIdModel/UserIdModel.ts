import { Schema, model, Model} from "mongoose";
import { IUser } from "../../../interfaces/IModels";

const userIdSchema = new Schema<IUser>({
  userId: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true},
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	dateOfBirth: {type: Date, required: true},
  lastUpdateIn: { type: Date, required: true },
});

const UserIdModel: Model<IUser> = model<IUser>("UserId", userIdSchema);

export default UserIdModel;
