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
        this.URL_M2 = process.env.URL_M2 || "need M2 URL"
        this.KEY = process.env.KEY || "test";
        this.iv = Buffer.alloc(16); // 256-bit key (32 bytes)    
    }

    public async initialize(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(email, password)
        try{
            const user: User | null = await this.findUser( email, password );
            
            if(user){             
                const idC = this.encryptMessage((user._id).toString(), this.KEY, this.iv);
                const soulNameC = this.encryptMessage(user.soulName, this.KEY, this.iv);
                const emailC = this.encryptMessage(email, this.KEY, this.iv);
                
                const m2_res = await this.getToken( idC, soulNameC, emailC );
                if("message" in m2_res){
                    throw {status: 500, message: m2_res.message}
                } else {
                    res.status(200).json({ auth: m2_res.auth, token: m2_res.token , URL_M2: this.URL_M2 });
                }
                
            } else {
                throw {message: "Password do not match!", status: 401}
            }

        } catch( error ){
            const { status, message } = error as CustomError;
            console.error("Error while trying to log in: "+ message);
            res.status(status).json({ message }).end();
        }
    }

    private async findUser(email: string, password: string): Promise<{ _id: string, soulName: string } | null> {   
        
        const {passEncrypt}: { passEncrypt: string } = await validateCredentials(email, password, true);
        const user: User | null = await userModel.findOne({ email: email, password: passEncrypt }, '_id soulName');

        if (user) {
            // Returns an object containing the _id and soulName of the user
            return { _id: user._id, soulName: user.soulName };
        } else {
            // Returns null if no user is found
            return null;
        }
                
      
    } // validates email and password credentials in the database

    private encryptMessage(message: string, key: string, iv: Buffer): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        if(!encrypted){
            throw {message: "Error encrypting data.", status: 500}
        }
        return encrypted;
    
    } 

    private async getToken(idC: string, soulNameC: string, emailC: string): Promise<{ auth: boolean, token: string} | {message: string}> {
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
            console.error('Error connecting to M2:', err.message);
            return { message: err.message }
        }
    }
    
}

export { Login };
