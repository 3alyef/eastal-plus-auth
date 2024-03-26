import { Request, Response } from "express";

class UnregisterCollection {
    postUnregister(req: Request, res: Response){
        res.send("Você está tentando apagar sua conta!")
    }
}


const unregisterCollection = new UnregisterCollection();

export { unregisterCollection };