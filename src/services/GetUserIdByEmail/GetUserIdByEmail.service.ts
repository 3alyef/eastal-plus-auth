import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";
import { GetUserId } from "../../routes/controllers/UserIdByEmailController/IUserIdByEmailController";
import { getAccountData } from "../Services";

export default class GetUserIdByEmail {
  public async init(
    email: string | undefined
  ): Promise<GetUserId | IStatusMsg> {
    try {
      if (email) {
        const response = await getAccountData<GetUserId>(email, "userId");

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
      const error = err as IStatusMsg;
      console.error(error.message);
      return error;
    }
  }
}
