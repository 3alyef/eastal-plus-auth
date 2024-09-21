import { Schema, model, Model} from "mongoose";
import { IUser } from "../../../interfaces/IModels";

const userAboutSchema = new Schema<IUser>({
  userId: { type: String, required: true },
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	dateOfBirth: {type: Date, required: false},
}, {
	timestamps: {
		createdAt: false,
		updatedAt: "updatedAt"
	}
});

const UserAboutModel: Model<IUser> = model<IUser>("UserAbout", userAboutSchema);

export default UserAboutModel;
