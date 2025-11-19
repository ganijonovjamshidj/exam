import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/index.js';
import jwtConfig from '../config/jwtConfig.js';

export const registerUser = async (userData) => {
  const existingUser = await userModel.getUserByEmail(userData.email);
  if (existingUser) throw new Error('Email already exists');

  const newUser = await userModel.createUser(userData);
  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const accessToken = jwt.sign({ id: user.id, role: user.role }, jwtConfig.accessTokenSecret, { expiresIn: jwtConfig.accessTokenExpiry });
  const refreshToken = jwt.sign({ id: user.id }, jwtConfig.refreshTokenSecret, { expiresIn: jwtConfig.refreshTokenExpiry });

  return { accessToken, refreshToken };
};

export const verifyUser = async (userId) => {
  const user = await userModel.updateUserStatus(userId, 'active');
  return user;
};

export const getCurrentUser = async (userId) => {
  const user = await userModel.getUserById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

export const refreshUserToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret);

    const user = await userModel.getUserById(decoded.id);
    if (!user) throw new Error('User not found');

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      jwtConfig.accessTokenSecret,
      { expiresIn: jwtConfig.accessTokenExpiry }
    );

    return { accessToken: newAccessToken };
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};
