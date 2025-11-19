import db from '../config/dbConfig.js'; // db = pool
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token nomalum' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userResult = await db.query(
      'SELECT id, username, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Foyddalanuvchi yoq' });
    }

    req.user = userResult.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token yaroqsiz' });
  }
};

export default authMiddleware;
