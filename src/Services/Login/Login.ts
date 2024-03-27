import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
class Login {
    public async initialize(req: Request, res: Response) {
        const { email, password } = req.body;
        try{

            const userId = await this.findUser( email, password );
            if(userId){

            } else {
                res.status(401).json({ message: "Email ou senha não conferem!" });
            }

        } catch( error ){
            console.log(error);
            res.status(400).json({ message: "Ocorreu um erro durante o login."})
        }
    }

    private async findUser( email: string, password: string ){
        const userId = userModel.find({email: email, password: password}, "_id")
        return userId
    }
}

export { Login };
