import { Request, Response, Router } from "express";
import * as Controll from "./controllers/Controllers";

const router: Router = Router();

router.get('/', (req: Request, res: Response)=>{
    console.log('usuário novo...');
    res.send("Hello! Welcome to Al-PostEl!");
})

router.post('/login', Controll.loginController.postLogin);
router.post('/register', Controll.registerController.postRegister);
router.post('/unregister', Controll.unregisterController.postUnregister);

router.post('/searchUser', Controll.searchUserController.postSearchUser);

export { router };