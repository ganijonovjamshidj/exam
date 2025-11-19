import db from '../config/dbConfig.js';

export const createAuthor = async (author) => {
  const result = await db.query(
    `INSERT INTO authors (first_name, last_name, biography, date_of_birth, nationality)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [author.firstName, author.lastName, author.biography, author.dateOfBirth, author.nationality]
  );
  return result.rows[0];
};

export const getAllAuthors = async () => {
  const result = await db.query(`SELECT * FROM authors ORDER BY last_name`);
  return result.rows;
};

export const getAuthorById = async (id) => {
  const result = await db.query(`SELECT * FROM authors WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateAuthor = async (id, author) => {
  const result = await db.query(
    `UPDATE authors SET first_name=$1, last_name=$2, biography=$3, date_of_birth=$4, nationality=$5, updated_at=NOW()
     WHERE id=$6 RETURNING *`,
    [author.firstName, author.lastName, author.biography, author.dateOfBirth, author.nationality, id]
  );
  return result.rows[0];
};

export const deleteAuthor = async (id) => {
  await db.query(`DELETE FROM authors WHERE id = $1`, [id]);
  return true;
};