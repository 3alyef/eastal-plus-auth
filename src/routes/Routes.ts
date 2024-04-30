import { Request, Response, Router, NextFunction } from "express";
import * as Controll from "./controllers/Controllers";
import { unregisterMiddleware } from "../middlewares/unregisterMiddleware";
import { userModel } from "../db/models/Models";
import { CustomError } from "../interfaces/common.interface";
const router: Router = Router();

const path = require("path");
const {uuid} = require("uuidv4")
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
})

const s3 = new aws.S3()
const upload = multer({

    storage: multerS3({
        s3,
        bucket: "alpostel",
        acl: 'public-read',
        key(req: Request, file:{originalname: string} , cb:(vl: null, newName: string) => string){
            cb(null, uuid() + path.extname(file.originalname))
        }
    })
})

router.post('/addPhoto', async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const soulName = req.headers.soulname;
        console.log(soulName)
        if(soulName){
            const user = await userModel.findOne({ soulName });

            if (!user) {
                throw { status: 401, message: "User not found" };
            }
            next()
        } else {
            throw {status: 401, message: "need soulName"}
        }
    } catch(error) {
        const { status, message } = error as CustomError;
        console.error("Error:", message);
        res.status(status).json({ message }).end();
    }
}, upload.single("imagem"),
Controll.changePhoto.postChangePhoto);

//upload.single("imagem"),

//===================================================//

router.get('/', (req: Request, res: Response)=>{
    console.log('usuário novo...');
    res.send("Hello! Welcome to Al-PostEl!");
})
router.post('/login/email', Controll.loginController.postEmail)
router.post('/login', Controll.loginController.postLogin);
router.post('/register', Controll.registerController.postRegister);
router.post('/unregister', unregisterMiddleware, Controll.unregisterController.postUnregister);
router.post('/searchUser', Controll.searchUserController.postSearchUser);
export { router };