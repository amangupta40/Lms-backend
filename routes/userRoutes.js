import express from "express";
import { loginUser, registerUser, updateUser, deleteUser } from "../controllers/userControllers.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/:userId").put(checkAuthorization, updateUser).delete(checkAuthorization,deleteUser);

export default router;
