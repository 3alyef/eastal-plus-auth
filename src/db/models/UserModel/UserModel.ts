import { mongoose } from "../../DB";

const UserScheme = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    soulName: String
});

const userModel = mongoose.model('User', UserScheme);

export { userModel };

