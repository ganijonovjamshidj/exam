import crypto from 'crypto';

const otpStore = new Map(); // oddiy memory store, keyin Redis bilan almashtirish mumkin

export const generateOTP = (userId) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore.set(userId, otp);
  setTimeout(() => otpStore.delete(userId), 5 * 60 * 1000); // 5 daqiqa ichida amal qiladi
  return otp;
};

export const verifyOTP = (userId, otp) => {
  const stored = otpStore.get(userId);
  if (!stored || stored !== otp) return false;
  otpStore.delete(userId);
  return true;
};
