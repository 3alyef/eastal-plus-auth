import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { CheckEmailRes, IAccount } from '../../interfaces/IModels';
import { StatusCode } from "../../interfaces/IStatusCode";
import { getAccountData } from "../Services";

export default class CheckEmail {
	public async init(email: string | undefined): Promise<CheckEmailRes | IStatusMsg> {
		try {
			if(email) {
				const IUserData: IStatusMsg | IAccount = await getAccountData(email);

				if("status" in IUserData) {
					throw IUserData;
				}

				return {
					email,
					accountType: IUserData.accountType,
					createdAt: IUserData.createdAt,
					updatedAt: IUserData.updatedAt
				};
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