import express from 'express';
import { registerUser,updateUser,deleteUser, loginUser } from '../controllers/userControllers.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/:id').put(updateUser).delete(deleteUser);

router.route('/login').post(loginUser);

export default router;