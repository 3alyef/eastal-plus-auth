import { defaultError } from "../../interfaces/IError";
import { StatusCode } from "../../interfaces/IStatusCode";
import { getUserAuth } from "../Services";

interface GetUserId {
  userId: string;
}

export default class GetUserIdByEmail {
  public async init(
    email: string | undefined
  ): Promise<{ userId: string } | defaultError> {
    try {
      if (email) {
        const response = await getUserAuth<GetUserId>(email, "userId");

        if ("message" in response) {
          throw response;
        }

        return { userId: response.userId };
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
}
