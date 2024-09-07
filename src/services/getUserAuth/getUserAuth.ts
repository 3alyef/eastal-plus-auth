import { UserIdModel } from "../../db/models/Models";
import { IUser } from "../../interfaces/IModels";

export default async function getUserAuth(email: string): Promise<false | IUser>{
	try {
		const userData: IUser | null = await UserIdModel.findOne({email}, "_id userId email password lastUpdateIn");

		if(userData === null) {
			throw { msg: "Usuário não encontrado" };
		}

		return userData;
	} catch(err) {
		const error = err as { msg: string };
		console.log(error.msg);
		
		return false;
	}
}