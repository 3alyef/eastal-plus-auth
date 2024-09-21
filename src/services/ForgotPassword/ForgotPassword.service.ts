import { Subject } from "../../interfaces/IEmailSender";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import emailSender from "../../utils/EmailSender.util";
import globalsVar from "../../utils/Global";
import { IEmailRecovery, IEmailRecoveryCode } from "../../views/dictionaries-interface/IDictionaries";
import getDictionary from "../../views/lib/get-dictionary";
import { Locale } from "../../views/lib/locale-views";
import { Views } from "../../views/lib/Views";
import { GenerateRandomCode, getAccountData } from "../Services";

export default class ForgotPassword {
	private generateRandomCode: GenerateRandomCode;
	constructor() {
		this.generateRandomCode = new GenerateRandomCode();
	}
	public async init(email: string | undefined): Promise<IStatusMsg> {
		try {
			if(email && email.includes("@")) {
				const response = await getAccountData<{
					userId: string;
					language: Locale
				}>(email, "userId language");

				if("status" in response) {
					throw response;
				}

				const { userId, language } = response;

				const { code, validate } = this.generateRandomCode.init(6, 2);

				globalsVar.addCodeValidate(userId, code, validate);

				await emailSender.sendMsg<IEmailRecoveryCode, IEmailRecovery>(email, Subject.AccountRecovery, Views.EmailRecovery, {
					code
				}, language);

				return {
					message: `{
					userId: ${userId},
					language: ${language},
					code: ${code},
					validate: ${validate}
					}`,
					status: StatusCode.OK
				}
			} else {
				throw {
					message: "Email incompleto ou faltando.",
					status: StatusCode.BAD_REQUEST,
				}
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.log(error.message);
			return error;
		}
	}
}