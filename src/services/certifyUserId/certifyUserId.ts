
import { UserAboutModel } from "../../db/models/Models";
import globalsVar from "../../utils/Global";

export default async function certifyUserId(userId: string): Promise<boolean> {
	try {
		const certUserId = await UserAboutModel.findOne({ userId });
		const userIdNotAv = globalsVar.getUserIds();
		const includeInNotAv = userIdNotAv.filter(el => el === userId);
		if(certUserId === null && includeInNotAv.length === 0) {
			return false;
		}
		return true;
	} catch(err) {
		const error = err as { msg: string };
		console.log(error.msg);
		
		return false;
	}
}