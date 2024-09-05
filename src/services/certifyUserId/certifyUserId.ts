import { UserIdModel } from "../../db/models/Models";

export default async function certifyUserId(userId: string): Promise<boolean> {
	try {
		const certUserId = await UserIdModel.findOne({ userId });
		if(certUserId === null) {
			return false;
		}
		return true;
	} catch(err) {
		const error = err as { msg: string };
		console.log(error.msg);
		
		return false;
	}
}