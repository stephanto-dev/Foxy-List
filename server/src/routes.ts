import {Router} from "express";
import { LoginController } from "./controllers/LoginController";
import { SignupController } from "./controllers/SignupController";

const router = Router();

const signupController = new SignupController();
const loginController = new LoginController();


router.post("/signup", signupController.create);
router.post("/login", loginController.create);

export {router}