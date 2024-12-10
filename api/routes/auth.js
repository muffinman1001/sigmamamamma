import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router; 