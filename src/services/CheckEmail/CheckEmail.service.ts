import { Request } from "express";
import { defaultError } from "../../interfaces/IError";
import { IUser } from '../../interfaces/IModels';
import { StatusCode } from "../../interfaces/IStatusCode";
import { getUserAuth } from "../Services";

export default class CheckEmail {
	public async init(req: Request): Promise<IUser | defaultError> {
		try {
			const email = req.query.email as string | undefined;
			if(typeof email === "string") {
				const IUserData: defaultError | IUser = await getUserAuth(email);

				if("status" in IUserData) {
					throw {
						status: StatusCode.NOT_FOUND,
						message: "Email ausente na base de dados."
					}
				}

				return IUserData;
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