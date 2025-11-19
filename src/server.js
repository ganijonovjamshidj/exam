import app from './app.js';
import dotenv from 'dotenv';
import logger from './config/loggerConfig.js';

dotenv.config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server ishayotgan port ${PORT}`);
  console.log(`Server ishayotgan port ${PORT}`);
});
