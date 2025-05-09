import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/login/form", userController.renderLogin);

router.get("/private-cookies", passportCall("jwtCookies"), userController.profile);

export default router;
