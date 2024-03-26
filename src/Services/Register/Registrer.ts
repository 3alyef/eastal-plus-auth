import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/UserModel/UserModel";
class Register {

    public start(req: Request, res: Response) {
        const user_name: string = req.body.user_name;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const repeatPassword: string = req.body.repeatPassword;

        if(repeatPassword !== null && password !== repeatPassword){
            return res.status(400).json({message: "As senhas não correspondem."});
        }

        this.verifyUEP(user_name, email, password);
    }


    private async verifyUEP(user_name: string, email: string, password: string) {

        const test = await userModel.find(
            {
               "email": email
            }
        )

        console.log(test)
    }
}


const register: Register = new Register()

export { register };