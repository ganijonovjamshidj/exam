import * as userService from '../services/userService.js';
import asyncWrapper from '../utils/asyncWrapper.js';

export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export const getUserById = asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
});

export const createUser = asyncWrapper(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ userId: user.id, message: 'Foydalanuvchi yaratildi' });
});

export const updateUser = asyncWrapper(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json({ userId: user.id, message: 'Foydalanuvchi yangilandi' });
});

export const deleteUser = asyncWrapper(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ message: 'Foydalanuvchi ochirildi' });
});
