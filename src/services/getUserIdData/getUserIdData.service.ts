import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { IAccount } from "../../interfaces/IModels";
import { StatusCode } from "../../interfaces/IStatusCode";
import { AccountModel } from "../../db/models/Models";

export default async function getUserIdData<T>(
  email: string,
  howManyAttributes?: string
): Promise<IStatusMsg | T | IAccount> { 
  try {
    let userData: IAccount | T | null = null;
    if (howManyAttributes) {
      userData = await AccountModel.findOne({ email }, howManyAttributes) as T;
    } else {
      userData = await AccountModel.findOne(
        { email }
      ) as IAccount;
    }

    if (userData === null) {
      throw { status: StatusCode.NOT_FOUND, message: "Usuário não encontrado" };
    }

    return userData;
  } catch (err) {
    const error = err as IStatusMsg;
    console.log(error.message);

    return error;
  }
}
