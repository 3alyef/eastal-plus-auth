import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
class Register {

    public async initialize(req: Request, res: Response) {
        const { user_name, email, password, repeatPassword } = req.body;
        
        try {
            const _isPasswordOk= this.verifyPassword(password, repeatPassword);
            if(_isPasswordOk){
                const _alreadyHaveEmail = await this.verifyEmail(email);
                if(!_alreadyHaveEmail) {
                    const newUser = await this.createNewAccount(user_name, email, password);
                    
                    return res.status(200).json({ message: "Registro bem-sucedido.", newUser });

                } else {
                    res.status(400).json({ message: "Email já cadastrado." });

                }
                
            } else {
                res.status(400).json({ message: "As senhas não correspondem." });

            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ocorreu um erro durante o registro.", error: error });
        }
       
    }

    private verifyPassword(password: string, repeatPassword: string){
        try {
            if(repeatPassword !== null && password !== repeatPassword){
                return false;
            }
            return true;
        } catch(error) {
            throw new Error("Ocorreu um erro ao verificar a correspondência das senhas.");
        }
        
    }

    private async verifyEmail(email: string) {

        try {
            // Verifica se já há um usuário cadastrado com o mesmo email
            const userExists = await userModel.exists({ email: email });
            return userExists ? true : false; // Retorna quando não há outro usuário (se não houver outro usuario retorna null === false, se houver retorna true)
            
        } catch (error) {
            console.error(error);
            throw new Error("Ocorreu um erro ao verificar o email.");
        }
        
    }

    private async createNewAccount(user_name: string, email: string, password: string) {
        try {
            const newUser = new userModel (
                {
                    user_name: user_name,
                    email: email,
                    password: password
                }
            )

            await newUser.save();
            return newUser;

        } catch (error) {
            throw new Error("Ocorreu um erro ao verificar o email.");

        }
    }
}

export { Register };