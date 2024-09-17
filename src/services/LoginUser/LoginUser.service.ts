import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { reqBodyLogin } from "../../routes/controllers/LoginController/ILoginController";
import { getUserIdData, tokenGenerator, validatePassword } from "../Services";
import { AccountLogin, AccountDataRes } from "./ILoginUser";

export default class LoginUser {
	public async init(reqBody: reqBodyLogin): Promise<IStatusMsg | { token: string }> {
		try {
			const { email, password } = reqBody;

			if(email && password) {
				const accountLogin = await getUserIdData<AccountLogin>(email, "userId accountType password");

				if("status" in accountLogin) {
					throw accountLogin;
				} else if("password" in accountLogin) {
					const checkPass = await validatePassword(password, accountLogin.password);

					if(checkPass === true) {
						const tokenRes = await tokenGenerator<AccountDataRes>({
							userId: accountLogin.userId,
							accountType: accountLogin.accountType,
							email
						});
						
						if(typeof tokenRes === "object") {
							throw tokenRes;
						}

						return { token: tokenRes };
					} else {
						throw {
							message: "Dados não coincidem.",
							status: StatusCode.UNAUTHORIZED,
						}
					}
				}
			}

			throw {
				message: "Dados incompletos.",
				status: StatusCode.BAD_REQUEST,
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message);
			return error;
		}
	}
}