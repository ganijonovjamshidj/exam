import * as authorService from '../services/authorService.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { authorValidation } from '../validations/authorValidation.js';

export const createAuthor = asyncWrapper(async (req, res) => {
  const { error } = authorValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const author = await authorService.createAuthor(req.body);
  res.status(201).json({ authorId: author.id, message: 'Author created' });
});

export const getAllAuthors = asyncWrapper(async (req, res) => {
  const authors = await authorService.getAllAuthors();
  res.json(authors);
});

export const getAuthorById = asyncWrapper(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.id);
  res.json(author);
});

export const updateAuthor = asyncWrapper(async (req, res) => {
  const author = await authorService.updateAuthor(req.params.id, req.body);
  res.json({ authorId: author.id, message: 'Author updated' });
});

export const deleteAuthor = asyncWrapper(async (req, res) => {
  await authorService.deleteAuthor(req.params.id);
  res.json({ message: 'Author deleted' });
});
