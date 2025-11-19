import { userModel } from '../models/index.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

export const getUserById = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) throw new Error('User not found');
  return user;
};

export const createUser = async (userData) => {
  const existing = await userModel.getUserByEmail(userData.email);
  if (existing) throw new Error('Email already exists');

  // Parolni hash qilish
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  const user = await userModel.createUser(userData);
  return user;
};

export const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updated = await userModel.updateUser(id, data);
  if (!updated) throw new Error('User not found or update failed');
  return updated;
};

export const deleteUser = async (id) => {
  const result = await userModel.deleteUser(id);
  return result;
};
