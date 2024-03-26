import { Request, Response } from "express";

class LoginCollection {
    postLogin(req: Request, res: Response) {
        res.send('Você está tentando fazer login!')
    }
}

const loginCollection = new LoginCollection();

export { loginCollection };