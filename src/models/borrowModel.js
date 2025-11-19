import db from '../config/dbConfig.js';

export const createBorrow = async (borrow) => {
  const result = await db.query(
    `INSERT INTO borrows (book_id, user_id, borrow_date, due_date, status)
     VALUES ($1, $2, $3, $4, 'borrowed') RETURNING *`,
    [borrow.bookId, borrow.userId, borrow.borrowDate, borrow.dueDate]
  );

  // Kitob mavjud nusxalarini kamaytirish
  await db.query(`UPDATE books SET available_copies = available_copies - 1 WHERE id = $1`, [borrow.bookId]);

  return result.rows[0];
};

export const getAllBorrows = async () => {
  const result = await db.query(`SELECT * FROM borrows ORDER BY borrow_date DESC`);
  return result.rows;
};

export const getBorrowById = async (id) => {
  const result = await db.query(`SELECT * FROM borrows WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateBorrow = async (id, update) => {
  const borrow = await getBorrowById(id);
  if (!borrow) return null;

  // Agar returnDate berilsa va status 'returned' bo‘lsa, available_copies oshiriladi
  if (update.status === 'returned' && borrow.status !== 'returned') {
    await db.query(`UPDATE books SET available_copies = available_copies + 1 WHERE id = $1`, [borrow.book_id]);
  }

  const result = await db.query(
    `UPDATE borrows SET return_date=$1, status=$2, updated_at=NOW() WHERE id=$3 RETURNING *`,
    [update.returnDate, update.status, id]
  );
  return result.rows[0];
};

export const deleteBorrow = async (id) => {
  const borrow = await getBorrowById(id);
  if (borrow && borrow.status !== 'returned') {
    await db.query(`UPDATE books SET available_copies = available_copies + 1 WHERE id = $1`, [borrow.book_id]);
  }

  await db.query(`DELETE FROM borrows WHERE id = $1`, [id]);
  return true;
};
