import { Request, Response } from "express";
import { reqBodyRegister } from "./IRegisterController";
import { RegisterUser } from "../../../services/Services";
import DefaultController from "../DefaultController";

class RegisterController extends DefaultController {
  private register: RegisterUser;

  constructor(req: Request, res: Response) {
		super(req, res);
    this.register = new RegisterUser();
		this.start();
  }

  private async start(): Promise<void> {
    const reqBody: reqBodyRegister = this.req.body;

    let { status, message } = await this.register.init(reqBody);

    this.res.status(status).json({
			message,
		}).end();
  }
}

export default RegisterController;
