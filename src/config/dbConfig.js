import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,               
  password: process.env.DB_PASSWORD,       
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), 
  database: process.env.DB_NAME,
});

pool.on('connect', () => {
  console.log('PostgreSQL ga ulanish ornatildi');
});

pool.on('error', (err) => {
  console.error('PostgreSQL xatosi', err);
});

export default pool;