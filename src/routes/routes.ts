import { Request, Response, Router } from "express";
import * as controll from "./controllers/controllers";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("usuário novo...");
  res.send("Hello! Welcome to Al authentication!");
});

router.post("/register", (req, res) => {
	new controll.RegisterController(req, res);
}); // OK

router.post("/login", (req, res) => {
	new controll.LoginController(req, res);
});

router.get("/check-email", (req, res) => {
	new controll.CheckEmailController(req, res);
}) // OK

router.get("/userid-by-email", (req, res) => {
	new controll.UserIdByEmailController(req, res);
}); // OK

router.post("/unregister", (req, res) => {
	new controll.UnregisterController(req, res);
});

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