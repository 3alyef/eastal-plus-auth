import { AccountModel } from "../../db/models/Models";
import { IAccount } from "../../interfaces/IModels";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { IResetPassword } from "../../routes/controllers/ResetPasswordController/IResetPasswordController";
import encryptData from "../encryptData/encryptData";
import { getAccountData, ValidateCode, verifyPassword } from "../Services";

export default class ResetPassword {
	private validateCode: ValidateCode;
	constructor() {
		this.validateCode = new ValidateCode();
	}
  public async init({ email, code, password, repeatPassword }: IResetPassword): Promise<IStatusMsg> {
    try {
			const resCode = await this.validateCode.init(email, code);

			if(resCode.status !== StatusCode.OK){
				throw resCode;
			}

			verifyPassword(password, repeatPassword);

			if (email && code && password && repeatPassword) {
				
				let userData: IStatusMsg | IAccount = await getAccountData(email);
				
				if("status" in userData) {
					throw userData;
				}
				const hashPassword = await encryptData(password);

				if(typeof hashPassword !== "string") {
					throw hashPassword;
				}

				const response = await this.changeAccountPassword(email, hashPassword);

				return response;
			} else {
				throw {
					message: "Informações incompletas",
					status: StatusCode.BAD_REQUEST,
				}
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message);
			return error;
		}
  }

	private async changeAccountPassword(email: string, password: string) {
		try {
			const account = await AccountModel.updateOne({ email }, { password });

			if(account.modifiedCount === 0) {
				throw {
					message: "Erro ao atualizar senha",
					status: StatusCode.INTERNAL_SERVER_ERROR,
				}
			}

			return {
				message: "Sucess!",
				status: StatusCode.OK,
			};
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message);
			return error;
		}
	}
}
