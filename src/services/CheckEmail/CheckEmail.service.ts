import { defaultError } from "../../interfaces/IError";
import { IUser } from '../../interfaces/IModels';
import { StatusCode } from "../../interfaces/IStatusCode";
import { getUserAuth } from "../Services";

export default class CheckEmail {
	public async init(email: string): Promise<IUser | defaultError> {
		try {
			if(email) {
				const IUserData: false | IUser = await getUserAuth(email);

				if(IUserData !== false) {
					return IUserData;
				}

				throw {
					status: StatusCode.NOT_FOUND,
					message: "Email ausente na base de dados."
				}
			}

			throw {
				status: StatusCode.BAD_REQUEST, 
				message: "Informações incompletas."
			};
		} catch(err) {
			const error = err as defaultError;
      console.error(error);
      return error;
		}
	}
}