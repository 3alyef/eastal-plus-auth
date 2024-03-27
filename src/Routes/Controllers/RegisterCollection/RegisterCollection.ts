import { Request, Response } from "express";
import { Register } from "../../../Services/Services";

class RegisterCollection {
    postRegister(req: Request, res: Response){
        // res.send("Você está tentando registrar-se!, bem vamos começar!");
        new Register().initialize(req, res);
    }
}


const registerCollection = new RegisterCollection();

export { registerCollection };