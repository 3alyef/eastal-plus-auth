import { Request, Response } from "express";
import DefaultController from "../../DefaultController";
import { RegisterUser } from "../../../../services/Services";

class RegisterController extends DefaultController {
  private register: RegisterUser;

  constructor(req: Request, res: Response) {
		super(req, res);
    this.register = new RegisterUser();
		this.start();
  }

  private async start(): Promise<void> {
    const { firstName, lastName, email, password, repeatPassword } =
      this.req.body;

    let { status, message } = await this.register.init({
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
    });

    this.res.status(status).send(message).end();
  }
}

export default RegisterController;
