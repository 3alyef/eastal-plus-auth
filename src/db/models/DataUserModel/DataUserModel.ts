import { mongoose } from "../../DB";

const UserScheme = new mongoose.Schema({
    soulName: String,
    custom_name: String,
    lastUpdateIn: String
});

const DataUserModel = mongoose.model('UserDetails', UserScheme);

export { DataUserModel };