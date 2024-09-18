import { Request, Response, Router } from "express";
import * as controll from "./controllers/controllers";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
	new controll.HomeController(req, res);
}); // OK

router.post("/auth/register", (req, res) => {
	new controll.RegisterController(req, res);
}); // OK

router.post("/auth/login", (req, res) => {
	new controll.LoginController(req, res);
});

router.get("/auth/check-email", (req, res) => {
	new controll.CheckEmailController(req, res);
}) // OK

router.get("/auth/userid-by-email", (req, res) => {
	new controll.UserIdByEmailController(req, res);
}); // OK

router.post("/auth/unregister", (req, res) => {
	new controll.UnregisterController(req, res);
});

router.post("/auth/forgot-password", (req, res) => {
	new controll.ForgotPasswordController(req, res);
})

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