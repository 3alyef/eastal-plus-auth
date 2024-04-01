import { Request, Response } from "express";
import { SearchByEmail } from "../../../services/Services";

class SearchUserController{
    async postSearchUser(req: Request, res: Response){
        const {email} = req.body;

        // TODO: Busque pelo userSoul na DB atráves do email

        try {
            const userSoul:string | null = await new SearchByEmail().initialize(email)
            if(userSoul){
                res.status(200).send({ userSoul }).end();
            } else {
                res.status(404).send({ message: "not found" }).end();
            }

        } catch(error){
            console.error('Erro durante a pesquisa por email:', error);
            res.status(500).send({ message: "internal server error" }).end();
        }


    }
}

const searchUserController = new SearchUserController();
export { searchUserController }