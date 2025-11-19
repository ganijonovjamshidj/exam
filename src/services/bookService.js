import { bookModel } from '../models/index.js';

export const createBook = async (data) => {
  const book = await bookModel.createBook(data);
  return book;
};

export const getAllBooks = async () => {
  return await bookModel.getAllBooks();
};

export const getBookById = async (id) => {
  const book = await bookModel.getBookById(id);
  if (!book) throw new Error('Book not found');
  return book;
};

export const updateBook = async (id, data) => {
  const updated = await bookModel.updateBook(id, data);
  if (!updated) throw new Error('Book not found or update failed');
  return updated;
};

export const deleteBook = async (id) => {
  const result = await bookModel.deleteBook(id);
  return result;
};
