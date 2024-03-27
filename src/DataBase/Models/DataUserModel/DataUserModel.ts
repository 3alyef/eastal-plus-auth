import { mongoose } from "../../DataBase";

const UserScheme = new mongoose.Schema({
    main_id: String,
    custom_name: String,
    profile_picture: String,

}, { id: false });

const DataUserModel = mongoose.model('UserDetails', UserScheme);

export { DataUserModel };