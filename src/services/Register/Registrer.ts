import { Request, Response } from "express";
import { userModel } from "../../db/models/Models";
class Register {

    public async initialize(req: Request, res: Response) {
        const { user_name, email, password, repeatPassword } = req.body;
        
        try {
            const _isPasswordOk= this.verifyPassword(password, repeatPassword);
            if(_isPasswordOk){
                const _alreadyHaveEmail = await this.verifyEmail(email);
                if(!_alreadyHaveEmail) {
                    const test = process.env.FRIEND_LET || 'none'
                    const soulName = await this.generateSoulName(user_name);
                    if(soulName){ 
                        const newUser = await this.createNewAccount(user_name, email, password, soulName);
                    
                        return res.status(200).json({ message: "Registro bem-sucedido.", newUser, test}); 
                    }

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

    private verifyPassword(password: string, repeatPassword: string): boolean {
        try {
            if(repeatPassword !== null && password !== repeatPassword){
                return false;
            }
            return true;
        } catch(error) {
            throw new Error("Ocorreu um erro ao verificar a correspondência das senhas.");
        }
        
    }

    private async verifyEmail(email: string): Promise<boolean> {

        try {
            // Verifica se já há um usuário cadastrado com o mesmo email
            const userExists = await userModel.exists({ email: email });
            return userExists ? true : false; // Retorna quando não há outro usuário (se não houver outro usuario retorna null === false, se houver retorna true)
            
        } catch (error) {
            console.error(error);
            throw new Error("Ocorreu um erro ao verificar o email.");
        }
        
    }

    private async generateSoulName(user_name: string): Promise<string> {
        let user: string;

        if (user_name.includes(" ")) {
            user = user_name.split(" ")[0];
        } else {
            user = user_name;
        }
        let soulName = `rukh0${user}1`;
        
        try {
            const documentos: any[] = await userModel.find({});
            const soulNames: string[] = documentos.map(doc => doc.soulName);
    
            // Gera um soulName único
            let i = 1;
            while (soulNames.includes(soulName)) {
                soulName = `rukh${i}${user}${i + 1}`;
                i++;
            }
    
            return soulName;
        } catch (error) {
            console.error('Erro ao gerar soulName:', error);
            throw error; // Propaga o erro para quem chamou o método
        }
    }
    
    

    private async createNewAccount(user_name: string, email: string, password: string, soulName: string): Promise<object> {
        try {
            const newUser = new userModel (
                {
                    user_name: user_name,
                    email: email,
                    password: password,
                    soulName: soulName
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