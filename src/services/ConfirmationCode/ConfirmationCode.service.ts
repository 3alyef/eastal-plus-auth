import { ConfirmationCodeModel } from "../../db/models/Models";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";

export default class ConfirmationCode {
	private expiresInSeconds: number;
	constructor() {
		this.expiresInSeconds = Number(process.env.CONFIRM_CODE_EXPIRES) || 300;
	}

	public async verifyConfirmationCode(email: string, code: string, deleteCode?: boolean): Promise<IStatusMsg | true> {
		try {
			const confirmation = await ConfirmationCodeModel.findOne({ email, code });
			if (!confirmation) {
				throw {
					message: "Código expirado ou inválido.",
					status: StatusCode.UNAUTHORIZED,
				};
			}
			if(deleteCode){
				ConfirmationCodeModel.deleteOne({ email, code });
			}
			
			return true;
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message);
			return error;
		}
	}

	public async createConfirmationCode(email: string, code: string): Promise<IStatusMsg> {
		try {
			const confirmation = new ConfirmationCodeModel({ email, code });
			const create = await confirmation.save();
			
			if (create) {
				return { message: "Código de confirmação criado com sucesso", status: StatusCode.CREATED };
			} else {
				return { message: "Falha ao criar o código de confirmação", status: StatusCode.INTERNAL_SERVER_ERROR };
			}
		} catch(error) {
			console.error(error);
			return { message: "Erro ao salvar o código de confirmação", status: StatusCode.INTERNAL_SERVER_ERROR };
		}
	}

	public async getExpiresTime(email: string, code: string): Promise<IStatusMsg | Date> {
		try {
			const response = await ConfirmationCodeModel.findOne({ email, code }, "createdAt");

			if(!response || !("createdAt" in response)) {
				throw {
					message: "Erro ao buscar por createdAt",
					status: StatusCode.INTERNAL_SERVER_ERROR,
				}
			}

			const createdAt = response.createdAt as Date;

			const expiresTime = new Date(createdAt.getTime() + this.expiresInSeconds * 1000);

			return expiresTime;
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message)	;
			return error;
		}
	}
}