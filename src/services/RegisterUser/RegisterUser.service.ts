import { AccountModel, UserIdModel } from "../../db/models/Models";
import { IAccount } from "../../interfaces/IModels";
import { PropsGenerateRandomKey } from "./IRegisterUser";
import { certifyUserId, getUserIdData, verifyPassword } from "../Services";
import encryptData from "../encryptData/encryptData";
import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { reqBodyRegister } from "../../routes/controllers/RegisterController/IRegisterController";

export default class RegisterUser {
  public async init({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  }: reqBodyRegister): Promise<IStatusMsg> {
    try {
      if (firstName && lastName && email && password && repeatPassword) {
				verifyPassword(password, repeatPassword);
        let userData: IStatusMsg | IAccount = await getUserIdData(email);

        if ("status" in userData) {
					let userId = await this.generateUserId();

					let passwordEncrypted = await encryptData(password);

					if (typeof passwordEncrypted === "string") {
						await this.createAccount(
							firstName,
							lastName,
							email,
							passwordEncrypted,
							userId
						);
						return { status: StatusCode.CREATED, message: "CREATED" };
					} else {
						throw {
							status: StatusCode.INTERNAL_SERVER_ERROR,
							message: "Erro na encriptação da senha.",
						};
					}
        }

        throw {
					message: "Email já cadastrado no sistema",
					status: StatusCode.CONFLICT
				}
      }
      throw {
        status: StatusCode.BAD_REQUEST,
        message: "Informações incompletas.",
      };
    } catch (err) {
      const error = err as IStatusMsg;
      console.error(error);
      return error;
    }
  }

  private async generateUserId(): Promise<string> {
    let userId = "";
    while (true) {
      let randomKeys: PropsGenerateRandomKey = this.generateRandomKey();
      userId = `al${randomKeys.alKey}post${randomKeys.postKey}el${randomKeys.elKey}`;
      userId = userId.trim();

      let haveEqual = await certifyUserId(userId);

      if (haveEqual === false) {
        break;
      }
    }

    return userId;
  }

  private generateRandomKey(): PropsGenerateRandomKey {
    let rdAlf = "abcdefghijklmnopqrstuvwxyz";
    let rdNm = [];
    let rdStrings = [];
    for (let i = 0; i < 3; i++) {
      rdNm.push(Math.floor(Math.random() * 1000));

      let randomIndex1 = Math.floor(Math.random() * rdAlf.length);
      let randomIndex2 = Math.floor(Math.random() * rdAlf.length);

      rdStrings.push(
        `${rdAlf[randomIndex1]}${rdAlf[randomIndex2].toUpperCase()}`
      );
    }
    const keys: PropsGenerateRandomKey = {
      alKey: `${rdNm[0]}${rdStrings[0]}`,
      postKey: `${rdNm[1]}${rdStrings[1]}`,
      elKey: `${rdNm[2]}${rdStrings[2]}`,
    };
    return keys;
  }

  private async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userId: string
  ): Promise<void> {
    let userIdModel = new UserIdModel({
      userId,
      firstName,
      lastName,
    });
    let userDetailsModel = new AccountModel({
      userId,
      email,
      password,
      accountType: "normal",
      recoveryEmail: "",
    });
    await userIdModel.save();
    await userDetailsModel.save();

    if (!userIdModel || !userDetailsModel) {
      await UserIdModel.deleteOne({ userId });
      await userDetailsModel.deleteOne({ userId });

      throw {
        message: "Ocorreu um erro ao criar a conta.",
        status: StatusCode.NOT_IMPLEMENTED,
      };
    }
    return;
  }
}
