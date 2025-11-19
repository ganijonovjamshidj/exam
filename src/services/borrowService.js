import { borrowModel } from '../models/index.js';

export const createBorrow = async (data) => {
  const borrow = await borrowModel.createBorrow(data);
  return borrow;
};

export const getAllBorrows = async () => {
  return await borrowModel.getAllBorrows();
};

export const getBorrowById = async (id) => {
  const borrow = await borrowModel.getBorrowById(id);
  if (!borrow) throw new Error('Borrow record not found');
  return borrow;
};

export const updateBorrow = async (id, data) => {
  const updated = await borrowModel.updateBorrow(id, data);
  if (!updated) throw new Error('Borrow record not found or update failed');
  return updated;
};

export const deleteBorrow = async (id) => {
  const result = await borrowModel.deleteBorrow(id);
  return result;
};
