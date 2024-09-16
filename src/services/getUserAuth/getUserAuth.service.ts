import { UserIdModel } from "../../db/models/Models";
import { defaultError } from "../../interfaces/IError";
import { IUser } from "../../interfaces/IModels";
import { StatusCode } from "../../interfaces/IStatusCode";

export default async function getUserAuth<T>(
  email: string,
  howMany?: string
): Promise<defaultError | IUser | T> {
  try {
    let userData: IUser | T | null = null;
    if (howMany) {
      userData = await UserIdModel.findOne({ email }, howMany);
    } else {
      userData = await UserIdModel.findOne(
        { email },
        "_id userId email password lastUpdateIn"
      );
    }

    if (userData === null) {
      throw { status: StatusCode.NOT_FOUND, message: "Usuário não encontrado" };
    }

    return userData;
  } catch (err) {
    const error = err as defaultError;
    console.log(error.message);

    return error;
  }
}
