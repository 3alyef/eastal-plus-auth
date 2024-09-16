import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { reqBodyLogin } from "../../routes/controllers/user/LoginController/ILoginController";

export class LoginUser {
	public async init(reqBody: reqBodyLogin): Promise<IStatusMsg> {

	}
}