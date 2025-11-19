import * as bookService from '../services/bookService.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { bookValidation } from '../validations/bookValidation.js';

export const createBook = asyncWrapper(async (req, res) => {
  const { error } = bookValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const book = await bookService.createBook(req.body);
  res.status(201).json({ bookId: book.id, message: 'Kitob yaratildi' });
});

export const getAllBooks = asyncWrapper(async (req, res) => {
  const books = await bookService.getAllBooks();
  res.json(books);
});

export const getBookById = asyncWrapper(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  res.json(book);
});

export const updateBook = asyncWrapper(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  res.json({ bookId: book.id, message: 'Kitob yangilandi' });
});

export const deleteBook = asyncWrapper(async (req, res) => {
  await bookService.deleteBook(req.params.id);
  res.json({ message: 'Kitob ochirildi' });
});
