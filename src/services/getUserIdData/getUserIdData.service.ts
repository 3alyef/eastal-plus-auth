import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { IUser } from "../../interfaces/IModels";
import { StatusCode } from "../../interfaces/IStatusCode";
import { AccountModel } from "../../db/models/Models";

export default async function getUserIdData<T>(
  email: string,
  howManyAttributes?: string
): Promise<IStatusMsg | IUser | T> { 
  try {
    let userData: IUser | T | null = null;
    if (howManyAttributes) {
      userData = await AccountModel.findOne({ email }, howManyAttributes);
    } else {
      userData = await AccountModel.findOne(
        { email },
        "_id userId email password lastUpdateIn"
      );
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
