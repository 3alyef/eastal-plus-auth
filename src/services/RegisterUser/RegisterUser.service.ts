import { AccountModel, UserIdModel } from "../../db/models/Models";
import { IUser } from "../../interfaces/IModels";
import { PropsGenerateRandomKey, PropsRegister } from "./IRegisterUser";
import { certifyUserId, getUserAuth, verifyPassword } from "../Services";
import encryptData from "../encryptData/encryptData";
import { StatusCode } from "../../interfaces/IStatusCode";
import { defaultError } from "../../interfaces/IError";

export default class RegisterUser {
  public async init({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  }: PropsRegister): Promise<{ status: StatusCode; message: string }> {
    try {
      verifyPassword(password, repeatPassword);
      if (firstName && lastName && email && password && repeatPassword) {
        let userData: defaultError | IUser = await getUserAuth(email);

        if ("status" in userData) {
          throw { status: StatusCode.CONFLICT, message: "Email já cadastrado" };
        }

        let userId = await this.generateUserId();

        let passwordEncrypted = await encryptData(password);

        if (passwordEncrypted === "string") {
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
        status: StatusCode.BAD_REQUEST,
        message: "Informações incompletas.",
      };
    } catch (err) {
      const error = err as defaultError;
      console.error(error);
      return error;
    }
  }

  private async generateUserId(): Promise<string> {
    let userId = "";
    while (true) {
      let randomKeys: PropsGenerateRandomKey = this.generateRandomKey();
      userId = `
				al${randomKeys.alKey}
				post${randomKeys.postKey}
				el${randomKeys.elKey}
			`;
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
        `${rdAlf[randomIndex1]}
				${rdAlf[randomIndex2].toUpperCase()}`
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
    let lastUpdateIn = new Date().toISOString();
    let userIdModel = new UserIdModel({
      userId,
      dateOfBirth: "",
      firstName,
      lastName,
      email,
      password,
      lastUpdateIn,
    });
    let userDetailsModel = new AccountModel({
      userId,
      createdIn: lastUpdateIn,
      accountType: "normal",
      lastUpdateIn,
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
