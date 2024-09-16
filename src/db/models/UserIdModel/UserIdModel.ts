import { Schema, model, Model} from "mongoose";
import { IUser } from "../../../interfaces/IModels";

const userIdSchema = new Schema<IUser>({
  userId: { type: String, required: true },
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	dateOfBirth: {type: Date, required: true},
}, {
	timestamps: {
		createdAt: false,
		updatedAt: "updatedAt"
	}
});

const UserIdModel: Model<IUser> = model<IUser>("UserId", userIdSchema);

export default UserIdModel;
