import { Request, Response } from "express";

class UnregisterController {
    postUnregister(req: Request, res: Response){
        res.send("Você está tentando apagar sua conta!")
    }
}


const unregisterController = new UnregisterController();

export { unregisterController };