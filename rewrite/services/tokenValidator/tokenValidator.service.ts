import * as jwt from "jsonwebtoken";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { unregisterTokenData } from "../../routes/controllers/UnregisterController/IUnregisterControllerntroller";
import { StatusCode } from "../../interfaces/IStatusCode";

export default async function tokenValidator(tokenKey: string, token: string): Promise<unregisterTokenData | IStatusMsg> {
	try {
		const decoded = jwt.verify(token, tokenKey) as unregisterTokenData;
		return decoded;
	} catch(err) {
		const error = err as IStatusMsg;
    console.error(error.message);

    return {
      message: "Token inválido ou expirado.",
      status: StatusCode.UNAUTHORIZED,
    };
	}
}