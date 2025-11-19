import * as authService from '../services/authService.js';
import * as otpService from '../services/otpService.js';
import { sendEmail } from '../services/notificationService.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { signupValidation, signinValidation, verifyOtpValidation } from '../validations/authValidation.js';

export const signup = asyncWrapper(async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await authService.registerUser(req.body);
  const otp = otpService.generateOTP(user.id);

  await sendEmail(user.email, 'Your OTP', `Your OTP is ${otp}`);

  res.status(201).json({ message: 'User created', userId: user.id, otpSent: true });
});

export const verifyOtp = asyncWrapper(async (req, res) => {
  const { error } = verifyOtpValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { userId, otp } = req.body;
  const verified = otpService.verifyOTP(userId, otp);
  if (!verified) return res.status(400).json({ message: 'Invalid OTP' });

  await authService.verifyUser(userId);
  res.json({ message: 'OTP verified, account activated' });
});

export const signin = asyncWrapper(async (req, res) => {
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  const tokens = await authService.loginUser(email, password);

  res.json(tokens);
});

export const getMe = asyncWrapper(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  res.json(user);
});

export const logout = asyncWrapper(async (req, res) => {
  // Frontend tokenni o‘chiradi, backend uchun faqat response
  res.json({ message: 'Logout successful' });
});

export const refreshToken = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshUserToken(refreshToken);
  res.json(tokens);
});
