import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";
import { getUserIdData } from "../Services";
import { GetUserId } from "../../routes/controllers/user/UserIdByEmailController/IUserIdByEmailController";

export default class GetUserIdByEmail {
  public async init(
    email: string | undefined
  ): Promise<GetUserId | IStatusMsg> {
    try {
      if (email) {
        const response = await getUserIdData<GetUserId>(email, "userId");

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
