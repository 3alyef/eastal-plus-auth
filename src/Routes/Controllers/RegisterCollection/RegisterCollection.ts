import { Request, Response } from "express";

class RegisterCollection {
    postRegister(req: Request, res: Response){
        res.send("Você está tentando registrar-se!")
    }
}


const registerCollection = new RegisterCollection();

export { registerCollection };