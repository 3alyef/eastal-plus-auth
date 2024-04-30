import { Request, Response } from "express";

interface FilesRequest extends Request {
    file?: any;
}
export class ChangePhoto {
    public postChangePhoto(req: FilesRequest, res: Response) {
        res.send({url: req.file.location});
    }
}

const changePhoto = new ChangePhoto();
export { changePhoto };
