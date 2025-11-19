import dotenv from 'dotenv';
dotenv.config();

export default {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'yourAccessSecret',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'yourRefreshSecret',
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRES || '15m',
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRES || '7d',
};