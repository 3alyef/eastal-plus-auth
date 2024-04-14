import { Request, Response } from "express";
import { SearchByEmail } from "../../../services/Services";

class SearchUserController{
    async postSearchUser(req: Request, res: Response){
        const {email} = req.body;

        // TODO: Busque pelo userSoul na DB atráves do email

        try {
            const userSoul:string | null = await new SearchByEmail().initialize(email)
            if(userSoul){
                console.log("FOUND: "+ userSoul)
                res.status(200).send({ found: true, userSoul, message: "found" }).end();


            } else {
                console.log("NOT FOUND")
                res.status(404).send({ found: false, userSoul: null, message: "not found" }).end();

            } 
        } catch(error){
            console.error('Erro durante a pesquisa por email:', error);
            res.status(500).send({ found: false, message: "internal server error" }).end();
        }
    }
}

const searchUserController = new SearchUserController();
export { searchUserController }