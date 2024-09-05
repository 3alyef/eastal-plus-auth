import { Schema, model, Model } from "mongoose";
import { IUserDetails } from "../../../interfaces/models";

const UserScheme = new Schema<IUserDetails>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
	dateOfBirth: { type: Date, required: false },
  userId: { type: String, required: true },
	lastUpdateIn: { type: String, required: true },
});

const UserDetailsModel: Model<IUserDetails> = model<IUserDetails>("UserDetails", UserScheme);

export default UserDetailsModel;
