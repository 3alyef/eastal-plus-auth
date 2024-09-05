import { Request, Response } from "express";
import { certifyUserId, getUserAuth, verifyPassword } from "../../../services/Services";
import { IUser } from "../../../interfaces/models";
import encryptData from "../../../services/encryptData/encryptData";
import { UserDetailsModel, UserIdModel } from "../../../db/models/Models";
import { defaultError } from "../../../interfaces/error";

class RegisterController {
	private req: Request;
	private res: Response;

	constructor(req: Request, res: Response) {
		this.req = req;
		this.res = res;
		this.start();
	}

	private async start(): Promise<void> {
		try {
			const { firstName, lastName, email, password, repeatPassword } = this.req.body;

			verifyPassword(password, repeatPassword);

			if(firstName && lastName && email && password && repeatPassword) {
				let userData: false | IUser  = await getUserAuth(email);

				if(userData.valueOf() !== false) {
					throw new Error("Email já cadastrado");
				}

				let userId = "";
				while(true) {
					userId = this.generateUserId(firstName);
					let haveEqual = await certifyUserId(userId);
					if(haveEqual === false) {
						break;
					}
				}

				let passwordEncrypted = await encryptData(password);

				if(passwordEncrypted.valueOf() === "string") {
					await this.createAccount(firstName, lastName, email, password, userId);
					this.res.status(201).end();
				}
			}
		} catch(err) {
			const error = err as defaultError;
			console.log(error);

			this.res.status(error.status).send(error.message).end();
		}
	}

	private generateUserId(fn: string): string {
		let rdNm = [];
		
		for(let i = 0; i < 5; i++) {
			rdNm.push(Math.floor(Math.random() * 5));
		}

		let userId = `
			al${rdNm[4]}${fn[0]}${rdNm[1]}
			post${rdNm[0]}${fn[1]}
			${rdNm[2]}${rdNm[3]}
			el
		`;
		return userId.toLowerCase().trim();
	}
  
	private async createAccount(
		firstName: string, lastName: string, 
		email: string, password: string,
		userId: string,
	): Promise<void> {
		let lastUpdateIn = new Date().toISOString();
		let userIdModel = new UserIdModel({
			userId,
			email,
			password,
			lastUpdateIn
		});
		let userDetailsModel = new UserDetailsModel({
			userId,
			firstName,
			lastName,
			lastUpdateIn
		});
		await userIdModel.save();
		await userDetailsModel.save();

		if (!userIdModel || !userDetailsModel) {
      throw { message: "Ocorreu um erro ao criar a conta.", status: 501 };
    }
		return;
	}
}
  
export default RegisterController;
