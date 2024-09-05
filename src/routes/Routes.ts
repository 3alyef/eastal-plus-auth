import { Request, Response, Router } from "express";
import * as Controll from "./controllers/Controllers";
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
	new Controll.RegisterController(req, res);
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