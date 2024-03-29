import { Request, Response } from "express";
import { Login } from "../../../Services/Services"
class LoginController {
    postLogin(req: Request, res: Response) {
        // res.send('Você está tentando fazer login! Bem, vamos começar!')
        new Login().initialize(req, res);
    }
}

const loginController = new LoginController();

export { loginController };