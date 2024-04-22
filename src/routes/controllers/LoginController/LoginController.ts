import { Request, Response } from "express";
import { Login, EmailLogin } from "../../../services/Services"
class LoginController {

   

    postLogin(req: Request, res: Response) {
        // res.send('Você está tentando fazer login! Bem, vamos começar!')
        new Login().initialize(req, res);
    }
    postEmail(req: Request<{body:{email: string}}>, res: Response) {
        // Vai conferir no database se existe algum email correspondente
        new EmailLogin().initialize(req, res);
    }
   
}

const loginController = new LoginController();

export { loginController };