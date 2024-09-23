import { Subject } from "../../interfaces/IEmailSender";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import emailSender from "../../utils/EmailSender.util";
import { IEmailRecovery, IEmailRecoveryCode } from "../../views/dictionaries-interface/IDictionaries";
import { Locale } from "../../views/lib/locale-views";
import { Views } from "../../views/lib/Views";
import { ConfirmationCode, GenerateRandomCode, getAccountData } from "../Services";
import { IForgotPasswordRes } from "./IForgotPassword";

export default class ForgotPassword {
	private generateRandomCode: GenerateRandomCode;
	private confirmationCode: ConfirmationCode;
	constructor() {
		this.generateRandomCode = new GenerateRandomCode();
		this.confirmationCode = new ConfirmationCode();
	}
	public async init(email: string | undefined): Promise<IStatusMsg | IForgotPasswordRes> {
		try {
			if(email && email.includes("@")) {
				const response = await getAccountData<{
					language: Locale
				}>(email, "language");

				if("status" in response) {
					throw response;
				}

				const { language } = response;

				const { code } = this.generateRandomCode.init(6);

				const create = await this.confirmationCode.createConfirmationCode(email, code);

				const expiresTimeCode = await this.confirmationCode.getExpiresTime(email, code);

				if(create.status !== StatusCode.CREATED) {
					throw create;
				} else if("status" in expiresTimeCode) {
					throw expiresTimeCode;
				}

				await emailSender.sendMsg<IEmailRecoveryCode, IEmailRecovery>(email, Subject.AccountRecovery, Views.EmailRecovery, {
					code,
				}, language);

				return {
					message: `Email enviado.`,
					expiresAt: expiresTimeCode,
					status: StatusCode.OK
				}
			} else {
				throw {
					message: "Email incompleto ou faltando.",
					status: StatusCode.BAD_REQUEST,
				};
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.log(error.message);
			return error;
		}
	}
}