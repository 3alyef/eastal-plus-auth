import { Request, Response } from "express";
import RegisterUser from "../../../services/RegisterUser/RegisterUser.service";

class RegisterController {
  private req: Request;
  private res: Response;
  private register: RegisterUser;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.start();
    this.register = new RegisterUser();
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
