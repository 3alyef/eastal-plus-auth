import { Request, Response } from "express";
import DefaultController from "../../DefaultController";
import { RegisterUser } from "../../../../services/Services";
import { reqBodyRegister } from "./IRegisterController";

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

    this.res.status(status).send(message).end();
  }
}

export default RegisterController;
