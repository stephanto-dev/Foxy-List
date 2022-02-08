import {Router} from "express";
import { ItemsController } from "./controllers/ItemsController";
import { LoginController } from "./controllers/LoginController";
import { SignupController } from "./controllers/SignupController";
import { StickyNoteController } from "./controllers/StickyNoteController";
import { loginVerify } from "./middlewares/loginVerify";

const router = Router();

const signupController = new SignupController();
const loginController = new LoginController();
const stickyNoteController = new StickyNoteController();
const itemsController = new ItemsController();


router.post("/signup", signupController.handle);
router.post("/login", loginController.handle);

router.post('/stickyNote', loginVerify, stickyNoteController.create);
router.delete('/stickyNote/:id', loginVerify, stickyNoteController.delete);
router.get('/stickyNote', loginVerify, stickyNoteController.get);

router.post('/stickyNote/:idStickyNote/item', loginVerify, itemsController.create);
router.delete('/stickyNote/:idStickyNote/item/:idItem', loginVerify, itemsController.delete);
router.patch('/stickyNote/:idStickyNote/item/:idItem/text', loginVerify, itemsController.update);
router.patch('/stickyNote/:idStickyNote/item/:idItem/status', loginVerify, itemsController.setIsDone);
router.get('/stickyNote/items', loginVerify, itemsController.get);


export {router}