import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
class Login {
    public async initialize(req: Request, res: Response) {
        interface User {
            _id: string;
            soulName: string;
        }
        const { email, password } = req.body;
        try{

            const user: User | null = await this.findUser( email, password );
            if(user){
                res.status(200).json({message: "Login realizado com sucesso!", user})

            } else {
                res.status(401).json({ message: "Email ou senha não conferem!" });
            }

        } catch( error ){
            console.log(error);
            res.status(400).json({ message: "Ocorreu um erro durante o login."})
        }
    }

    private async findUser(email: string, password: string): Promise<{ _id: string, soulName: string } | null> {
        interface User {
            _id: string;
            soulName: string;
        }
        
        try {
            const user: User | null = await userModel.findOne({ email: email, password: password }, '_id soulName');
    
            if (user) {
                // Retorna um objeto contendo o _id e o soulName do usuário
                return { _id: user._id, soulName: user.soulName };
            } else {
                // Retorna null se nenhum usuário for encontrado
                return null;
            }
        } catch (error) {
            console.error('Erro ao encontrar usuário:', error);
            throw new Error('Ocorreu um erro ao encontrar o usuário.');
        }
    }
    
}

export { Login };
