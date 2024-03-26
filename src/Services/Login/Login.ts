import { Request, Response } from "express";

class Login {
    public start(req: Request, res: Response){
        this.verifyAccount();
    }

    private verifyAccount(){
        
    }
}

const login: Login = new Login();

export { login };
