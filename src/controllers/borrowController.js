import * as borrowService from '../services/borrowService.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { borrowValidation } from '../validations/borrowValidation.js';

export const createBorrow = asyncWrapper(async (req, res) => {
  const { error } = borrowValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const borrow = await borrowService.createBorrow(req.body);
  res.status(201).json({ borrowId: borrow.id, message: 'Borrow Yaaratildi' });
});

export const getAllBorrows = asyncWrapper(async (req, res) => {
  const borrows = await borrowService.getAllBorrows();
  res.json(borrows);
});

export const getBorrowById = asyncWrapper(async (req, res) => {
  const borrow = await borrowService.getBorrowById(req.params.id);
  res.json(borrow);
});

export const updateBorrow = asyncWrapper(async (req, res) => {
  const borrow = await borrowService.updateBorrow(req.params.id, req.body);
  res.json({ borrowId: borrow.id, message: 'Borrow yangilandi' });
});

export const deleteBorrow = asyncWrapper(async (req, res) => {
  await borrowService.deleteBorrow(req.params.id);
  res.json({ message: 'Borrow ochirildi' });
});
