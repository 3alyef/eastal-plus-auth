import { mongoose } from "../../DataBase";

const UserScheme = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String
});

const userModel = mongoose.model('User', UserScheme);

export { userModel };