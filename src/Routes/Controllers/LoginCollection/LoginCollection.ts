import { Request, Response } from "express";
import { login } from "../../../Services/Services"
class LoginCollection {
    postLogin(req: Request, res: Response) {
        res.send('Você está tentando fazer login! Bem, vamos começar!')

        login.start(req, res)

    }
}

const loginCollection = new LoginCollection();

export { loginCollection };