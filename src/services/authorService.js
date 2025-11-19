import { authorModel } from '../models/index.js';

export const createAuthor = async (data) => {
  const author = await authorModel.createAuthor(data);
  return author;
};

export const getAllAuthors = async () => {
  return await authorModel.getAllAuthors();
};

export const getAuthorById = async (id) => {
  const author = await authorModel.getAuthorById(id);
  if (!author) throw new Error('Author not found');
  return author;
};

export const updateAuthor = async (id, data) => {
  const updated = await authorModel.updateAuthor(id, data);
  if (!updated) throw new Error('Author not found or update failed');
  return updated;
};

export const deleteAuthor = async (id) => {
  const result = await authorModel.deleteAuthor(id);
  return result;
};
