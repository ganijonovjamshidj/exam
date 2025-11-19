import db from '../config/dbConfig.js';

export const createBook = async (book) => {
  const result = await db.query(
    `INSERT INTO books (title, isbn, author_id, category, publication_date, total_copies, available_copies)
     VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING *`,
    [book.title, book.isbn, book.authorId, book.category, book.publicationDate, book.totalCopies]
  );
  return result.rows[0];
};

export const getAllBooks = async () => {
  const result = await db.query(`SELECT * FROM books ORDER BY title`);
  return result.rows;
};

export const getBookById = async (id) => {
  const result = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateBook = async (id, book) => {
  const result = await db.query(
    `UPDATE books SET title=$1, isbn=$2, author_id=$3, category=$4, publication_date=$5, total_copies=$6, updated_at=NOW()
     WHERE id=$7 RETURNING *`,
    [book.title, book.isbn, book.authorId, book.category, book.publicationDate, book.totalCopies, id]
  );
  return result.rows[0];
};

export const deleteBook = async (id) => {
  await db.query(`DELETE FROM books WHERE id = $1`, [id]);
  return true;
};