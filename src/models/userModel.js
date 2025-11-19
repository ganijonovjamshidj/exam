import db from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    const result = await db.query(
      `INSERT INTO users (email, username, password, role, status, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, username, role, status, first_name, last_name`,
      [
        user.email,
        user.username,
        hashedPassword,
        user.role || 'user',
        'inactive',
        user.firstName || '',
        user.lastName || ''
      ]
    );

    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err.message);
    throw new Error('Database error while creating user');
  }
};
