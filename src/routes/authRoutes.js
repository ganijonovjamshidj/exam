import express from 'express';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { signupValidation, signinValidation, verifyOtpValidation } from '../validations/authValidation.js';

const router = express.Router();

router.post('/signup', validate(signupValidation), authController.signup);
router.post('/verify-otp', validate(verifyOtpValidation), authController.verifyOtp);
router.post('/signin', validate(signinValidation), authController.signin);
router.get('/me', authMiddleware, authController.getMe);
router.get('/logout', authMiddleware, authController.logout);
router.post('/refresh-token', authController.refreshToken);

export default router;
