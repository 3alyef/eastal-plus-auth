import { Request, Response, Router } from "express";
import * as Controll from "./controllers/Controllers";
import { unregisterMiddleware } from "../middlewares/unregisterMiddleware";
const router: Router = Router();

const path = require("path");
const {uuid} = require("uuidv4")
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
})

const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "alpostel",
        acl: 'public-read',
        key(req: Request, file:{originalname: string} , cb){
            cb(null, uuid() + path.extname(file.originalname))
        }
    })
})
router.get('/', (req: Request, res: Response)=>{
    console.log('usuário novo...');
    res.send("Hello! Welcome to Al-PostEl!");
})

router.post('/login/email', Controll.loginController.postEmail)
router.post('/login', Controll.loginController.postLogin);
router.post('/register', Controll.registerController.postRegister);
router.post('/unregister', unregisterMiddleware, Controll.unregisterController.postUnregister);
router.post('/searchUser', Controll.searchUserController.postSearchUser);
router.post('/changeProfilePhoto', upload.single("imagem"), Controll.changePhoto.postChangePhoto)

export { router };