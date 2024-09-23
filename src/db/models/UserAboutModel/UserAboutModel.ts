import { Schema, model, Model} from "mongoose";
import { IUserAbout } from "../../../interfaces/IModels";

const userAboutSchema = new Schema<IUserAbout>({
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

const UserAboutModel: Model<IUserAbout> = model<IUserAbout>("UserAbout", userAboutSchema);

export default UserAboutModel;
