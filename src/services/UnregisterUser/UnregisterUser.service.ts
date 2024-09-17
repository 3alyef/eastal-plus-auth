import { Request } from "express";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { getUserIdData, tokenValidator, validatePassword } from "../Services";
import { StatusCode } from "../../interfaces/IStatusCode";
import { AccountModel, UserIdModel } from "../../db/models/Models";
import globalsVar from "../../utils/Global";
export default class UnregisterUser {
	private TOKEN_KEY_UNREGISTER: string;
	constructor() {
		this.TOKEN_KEY_UNREGISTER = process.env.UNREGISTER_KEY || "";
	}
	public async init(req: Request): Promise<IStatusMsg> {
		try {
			const { token } = req.body;

			const resToken = await tokenValidator(this.TOKEN_KEY_UNREGISTER, token);

			if("status" in resToken) {
				throw resToken;
			} 

			const {email, password} = resToken;
			
			const response = await getUserIdData<{ password: string, userId: string }>(email, "password userId");

			if("status" in response) {
				throw response;
			}

			const checkPass = await validatePassword(password, response.password);

			if(typeof checkPass === "object") {
				throw checkPass;

			} else if(checkPass === true) {
				const final = await this.deleteAccount(email, response.password, response.userId);

				if(typeof final === "object"){
					throw final;
				} else if(final === false){
					throw {
						message: "Falha ao deletar conta",
						status: StatusCode.NOT_IMPLEMENTED,
					}
				}
				return final;
			} else {
				throw {
					message: "Senha incorreta",
					status: StatusCode.UNAUTHORIZED,
				}
			}
		} catch(err) {
			const error = err as IStatusMsg;
      console.error(error);
      return error;
		}
	}

	private async deleteAccount(email: string, refPassword: string, userId: string): Promise<IStatusMsg>  {
		try {
			globalsVar.setUserIds((prev) => [...prev, userId]);
			const AccountModelBackup = await AccountModel.find({ userId });
			const UserIdModelBackup = await UserIdModel.find({ userId });
			const deleteAccountData = await AccountModel.deleteOne({ userId, email, password: refPassword });
			const deleteUserIdData = await UserIdModel.deleteOne({ userId });

			if(deleteAccountData.deletedCount <= 0 || deleteUserIdData.deletedCount <= 0) {
				if(deleteAccountData.deletedCount <= 0) {
					let returnUserId = new UserIdModel(UserIdModelBackup);
					await returnUserId.save();
				} else {
					let returnAccount = new AccountModel(AccountModelBackup)
					await returnAccount.save();
				}

				globalsVar.setUserIds((prev) => prev.filter(usId => usId !== userId));
				throw {
					message: "Error ao deletar conta.",
					status: StatusCode.NOT_IMPLEMENTED
				}
			}
			return {
				message: "Conta deletada com sucesso!",
				status: StatusCode.OK
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.error("DeleteAccount: ", error.message);
			return error;
		}
	}
}