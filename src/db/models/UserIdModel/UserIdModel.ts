import { Schema, model, Model} from "mongoose";
import { IUser } from "../../../interfaces/models";

const userIdSchema = new Schema<IUser>({
  userId: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true},
  lastUpdateIn: { type: String, required: true },
});

const UserIdModel: Model<IUser> = model<IUser>("UserId", userIdSchema);

export default UserIdModel;
