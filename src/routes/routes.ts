import { Request, Response, Router } from "express";
import * as controll from "./controllers/controllers";
import { unregisterMiddleware } from "../middlewares/unregisterMiddleware";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("usuário novo...");
  res.send("Hello! Welcome to Al-PostEl!");
});

// confere se já existe um email no DB.
//router.post("/login/email", Controll.loginController.postEmail);

// faz o login
//router.post("/login", Controll.loginController.postLogin);

// registra
router.post("/register", (req, res) => {
	new controll.RegisterController(req, res);
});

// check-email

router.get("/check-email", (req, res) => {
	new controll.CheckEmailController(req, res);
})

// login 

router.post("/login", (req, res) => {
	new controll.LoginController(req, res);
});

// apaga o registro
/*router.post(
  "/unregister",
  unregisterMiddleware,
  Controll.unregisterController.postUnregister
);*/

// busca um usuario pelo email
/*router.post(
  "/searchUserByEmail",
  Controll.searchUserController.postSearchUserByEmail
);*/

// busca um usuario pelo costum name
/*router.post(
  "/searchUserByCostumName",
  Controll.searchUserController.postSearchByCostumName
);*/

export { router };
/*
import verifyAccount from "../middlewares/verifyAccountMiddleware";
import { upload } from "../utils/uploadAWS.util";
// adiciona uma imagem ao perfil de usuario
router.post(
  "/addPhoto",
  verifyAccount,
  upload.single("imagem"),
  Controll.changePhoto.postChangePhoto
);
*/