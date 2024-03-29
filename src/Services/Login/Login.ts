import { Request, response, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";
const crypto = require('crypto');

interface User {
    _id: string;
    soulName: string;
}
class Login {
    private URL: string;
    private KEY: string;
    private iv: Buffer;
    
    constructor(){
        this.URL = process.env.M2ADRESS || "need URL";
        this.KEY = process.env.KEY || "test";
        this.iv = Buffer.alloc(16); // Chave de 256 bits (32 bytes)    
    }

    public async initialize(req: Request, res: Response) {

        const { email, password } = req.body;

        try{

            const user: User | null = await this.findUser( email, password );
            
            if(user){
                 
                
                const idC = this.encryptMessage((user._id).toString(), this.KEY, this.iv);
                const soulNameC = this.encryptMessage(user.soulName, this.KEY, this.iv);
                const emailC = this.encryptMessage(email, this.KEY, this.iv);
                
                const m2_res = await this.getToken( idC, soulNameC, emailC );

                if(m2_res){
                    res.status(200).json({ auth: m2_res.auth, token: m2_res.token , URL_M2: m2_res.URL_M2 })
                } else {
                    console.error("Erro ao gerar token.");
                    throw new Error("Erro ao gerar token.")
                }  
                
            } else {
                res.status(401).json({ message: "Email ou senha não conferem!" });
            }

        } catch( error ){
            console.log(error);
            res.status(400).json({ message: "Ocorreu um erro durante o login.", error })
        }
    }

    private async findUser(email: string, password: string): Promise<{ _id: string, soulName: string } | null> {
        
        
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
    } // valida as credênciais email and password na database

    private encryptMessage(message: string, key: string, iv: Buffer): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } // criptografa os dados

    private async getToken(idC: string, soulNameC: string, emailC: string): Promise<{ auth: boolean, token: string, URL_M2: string }> {

        const body = JSON.stringify({ idC, soulNameC, emailC });

        try {
            const response = await fetch(`${this.URL}/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`Falha na solicitação: ${response.statusText}`);
            }  

            return await response.json();
        } catch (error) {
            console.error('Erro ao conectar com M2:', error);
            return { auth: false, token: '', URL_M2: '' };
        }
    } // envia a requisição de token para M2
    
}

export { Login };
