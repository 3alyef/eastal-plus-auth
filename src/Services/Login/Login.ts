import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
const crypto = require('crypto');

class Login {
    public async initialize(req: Request, res: Response) {
        interface User {
            _id: any;
            soulName: string;
        }
        const { email, password } = req.body;
        try{

            const user: User | null = await this.findUser( email, password );
            if(user){
                const key = process.env.KEY || "test"; // Chave de 256 bits (32 bytes)
                const iv = Buffer.alloc(16);
                
                const idC = this.encryptMessage((user._id).toString(), key, iv);

                const soulNameC = this.encryptMessage(user.soulName, key, iv);

                const emailC = this.encryptMessage(email, key, iv);

                const friendLet = process.env.FRIEND_LET || "need";

                const friendLetC = this.encryptMessage(friendLet.toString(), key, iv);
                
                const token = await this.getToken(idC, soulNameC, emailC, friendLetC);
                
        
                console.log(token)

                if(token){
                    res.status(200).json({message: "Login realizado com sucesso!", token})
                } else {

                    console.error('Erro ao gerar token.');
                    throw new Error("Erro ao gerar token.")
                }  
                
            } else {
                res.status(401).json({ message: "Email ou senha não conferem!" });
            }

        } catch( error ){
            console.log(error);
            res.status(400).json({ message: "Ocorreu um erro durante o login.", error})
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

    private encryptMessage(message: string, key: string, iv: Buffer): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } // criptografa os dados

    private async getToken(idC: string, soulNameC: string, emailC: string, friendLetC: string) {
        const response = await this.connectM2(idC, soulNameC, emailC, friendLetC);

        return response;
    }
    
    private async connectM2(idC: string, soulNameC: string, emailC: string, friendLetC: string) {
        const URL = `${process.env.M2ADRESS}/connect`;
        
        const body = JSON.stringify({ idC, soulNameC, emailC, friendLetC });

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`Falha na solicitação: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao conectar com M2:', error);
        }
    } // concta com M2
}

export { Login };
