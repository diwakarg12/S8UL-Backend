import express from 'express';
import { logout, resetPassowrd, signin, signup } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/resetpassword', resetPassowrd)
router.get('/logout', logout)


export default router;