import { Request, Response } from "express";
import { register } from "../../../Services/Services";

class RegisterCollection {
    postRegister(req: Request, res: Response){
        res.send("Você está tentando registrar-se!, bem vamos começar!");

        register.start(req, res)
    }
}


const registerCollection = new RegisterCollection();

export { registerCollection };