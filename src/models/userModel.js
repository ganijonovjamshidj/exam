import db from '../config/dbConfig.js';

// Foydalanuvchi yaratish
export const createUser = async (user) => {
  const result = await db.query(
    `INSERT INTO users (email, username, password, role, status, first_name, last_name)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      user.email, 
      user.username, 
      user.password, 
      user.role || 'user', 
      user.status || 'inactive', 
      user.firstName, 
      user.lastName
    ]
  );
  return result.rows[0];
};

// Barcha foydalanuvchilar
export const getAllUsers = async () => {
  const result = await db.query(`SELECT id, email, username, role, status, first_name, last_name FROM users`);
  return result.rows;
};


// ID bo'yicha foydalanuvchi
export const getUserById = async (id) => {
  const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

// Email bo'yicha foydalanuvchi
export const getUserByEmail = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

// Foydalanuvchini yangilash
export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  for (let key in data) {
    fields.push(`${key} = $${idx}`);
    values.push(data[key]);
    idx++;
  }
  values.push(id);

  const result = await db.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );

  return result.rows[0];
};

// Foydalanuvchi statusini yangilash
export const updateUserStatus = async (id, status) => {
  const result = await db.query(
    `UPDATE users SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

// Foydalanuvchini o'chirish
export const deleteUser = async (id) => {
  const result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
};
