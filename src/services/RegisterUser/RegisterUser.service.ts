import { AccountModel, UserIdModel } from "../../db/models/Models";
import { IUser } from "../../interfaces/models";
import { PropsRegister } from "./RegisterUser.interface";
import { certifyUserId, getUserAuth, verifyPassword } from "../Services";
import encryptData from "../encryptData/encryptData";
import { StatusCode } from "../../interfaces/status-code";

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
        let userData: false | IUser = await getUserAuth(email);

        if (userData.valueOf() !== false) {
          throw new Error("Email já cadastrado");
        }

        let userId = "";
        while (true) {
          userId = this.generateUserId(firstName);
          let haveEqual = await certifyUserId(userId);
          if (haveEqual === false) {
            break;
          }
        }

        let passwordEncrypted = await encryptData(password);

        if (passwordEncrypted.valueOf() === "string") {
          await this.createAccount(
            firstName,
            lastName,
            email,
            password,
            userId
          );
          return { status: StatusCode.CREATED, message: "CREATED" };
        } else {
          throw new Error("Erro na encriptação da senha.");
        }
      }
      throw new Error("Informações incompletas.");
    } catch (error: any) {
      console.error(error);
      return {
        status: StatusCode.INTERNAL_SERVER_ERROR,
        message: error || "Erro interno do servidor.",
      };
    }
  }

  private generateUserId(fn: string): string {
    let rdNm = [];

    for (let i = 0; i < 5; i++) {
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
