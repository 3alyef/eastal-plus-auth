import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { IUser } from '../../interfaces/IModels';
import { StatusCode } from "../../interfaces/IStatusCode";
import { getUserIdData } from "../Services";

export default class CheckEmail {
	public async init(email: string | undefined): Promise<IUser | IStatusMsg> {
		try {
			if(typeof email === "string") {
				const IUserData: IStatusMsg | IUser = await getUserIdData(email);

				if("status" in IUserData) {
					throw IUserData;
				}

				return IUserData;
			}

			throw {
				status: StatusCode.BAD_REQUEST, 
				message: "Informações incompletas."
			};
		} catch(err) {
			const error = err as IStatusMsg;
      console.error(error.message);
      return error;
		}
	}
}