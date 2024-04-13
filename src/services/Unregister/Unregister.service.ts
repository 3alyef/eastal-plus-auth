import { Request, Response } from "express";
import { unregisterRequest } from "../../interfaces/unregister.interface";
import { validateCredentials } from "../Services";
import { userModel } from "../../db/models/Models";
import { CustomError } from "../../interfaces/common.interface";

export default class Unregister {
    public async initialize(req: Request<{body: unregisterRequest}>, res: Response){
        try {
            const { email, password } = req.body
            const {passEncrypt}: { passEncrypt: string } = await validateCredentials(email, password, false);

            await this.deleteAccount(email, passEncrypt);

            res.status(204).end();
        } catch( error ){ 
            const { status, message } = error as CustomError;
            console.error("Erro ao deletar conta: "+ message);
            res.status(status).json({ message }).end();
        }
    }

    private async deleteAccount(email: string, passEncrypt: string){
        try {
            const data = await userModel.deleteOne({email: email, password: passEncrypt});
            if(!data.deletedCount){
                throw {message: "Erro ao deletar conta", status: 501};
            }
            return;
        } catch( error ){
            throw error;
        }
    }
}

