import { mongoose } from "../../DB";

const UserScheme = new mongoose.Schema({
    soulName: String,
    userImage: String,
    lastUpdateIn: String
});

const DataUserImageModel = mongoose.model('UserImageDetails', UserScheme);

export { DataUserImageModel };