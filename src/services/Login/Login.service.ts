import { Request, response, Response } from "express";
import { userModel } from "../../db/models/Models";
const crypto = require('crypto');
import { validateCredentials } from "../Services";
import { CustomError } from "../../interfaces/common.interface";
interface User {
    _id: string;
    soulName: string;
}
class Login {
    private KEY: string;
    private iv: Buffer;
    private URL_M2: string;
    constructor(){
        this.URL_M2 = process.env.URL_M2 || "need M2 URl"
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
                    res.status(200).json({ auth: m2_res.auth, token: m2_res.token , URL_M2: this.URL_M2 })
                } else {
                    console.error("Erro ao gerar token.");
                    throw new Error("Erro ao gerar token.")
                }  
                
            } else {
                throw {message: "Email ou senha não conferem!", status: 401}
            }

        } catch( error ){
            const { status, message } = error as CustomError;
            console.error("Erro ao tentar fazer login: "+ message);
            res.status(status).json({ message }).end();
        }
    }

    private async findUser(email: string, password: string): Promise<{ _id: string, soulName: string } | null> {   
        
        const {passEncrypt}: { passEncrypt: string } = await validateCredentials(email, password, true);
        const user: User | null = await userModel.findOne({ email: email, password: passEncrypt }, '_id soulName');

        if (user) {
            // Retorna um objeto contendo o _id e o soulName do usuário
            return { _id: user._id, soulName: user.soulName };
        } else {
            // Retorna null se nenhum usuário for encontrado
            return null;
        }
                
      
    } // valida as credênciais email and password na database

    private encryptMessage(message: string, key: string, iv: Buffer): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        if(!encrypted){
            throw {message: "Erro ao encriptar dados.", status: 500}
        }
        return encrypted;
    
    } 

    private async getToken(idC: string, soulNameC: string, emailC: string): Promise<{ auth: boolean, token: string }> {
        try {
            const body = JSON.stringify({ idC, soulNameC, emailC });
            console.log(body)
            const response = await fetch(`${this.URL_M2}/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
            // console.log(response)
            if (!response.ok) {
                throw {message: response.statusText}
            }  
            return await response.json();
        } catch (error) {
            const err = error as CustomError
            console.error('Erro ao conectar com M2:', err.message);
            return { auth: false, token: '' };
        }
    }
    
}

export { Login };