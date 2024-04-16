import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";
import updateUser from "../controllers/updateUserController.js";
const router = Router();

router.put("/", verifyToken, updateUser);
router.post("/signup", userController.userSignup);
router.post("/signin", userController.userSignin);
router.get("/bulk",verifyToken,userController.getUsers);

export default router;
