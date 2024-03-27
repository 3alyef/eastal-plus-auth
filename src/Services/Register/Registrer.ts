import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
class Register {

    public async start(req: Request, res: Response) {
        
        const user_name: string = req.body.user_name;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const repeatPassword: string = req.body.repeatPassword;

        if(repeatPassword !== null && password !== repeatPassword){
            return res.status(400).json({message: "As senhas não correspondem."});
        }
        try {
            const newUser = await this.verifyUEP(user_name, email, password);

            if (newUser) {
                return res.status(200).json({ message: "Registro bem-sucedido.", newUser });
            } else {
                return res.status(400).json({ message: "Usuário já existe." });
            }

        } catch (error) {

            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro durante o registro." });

        }
    }

    private async verifyUEP(user_name: string, email: string, password: string) {

        const test = await userModel.exists(
            {
               "email": email
            }
        )

        if(test === null ){
           return this.createNewAccount(user_name, email, password);
        } else {
            return false
        }
    }

    private async createNewAccount(user_name: string, email: string, password: string) {
        const newUser = new userModel (
            {
                user_name: user_name,
                email: email,
                password: password
            }
        )
        await newUser.save();
        return newUser;
    }
}


const register: Register = new Register()

export { register };