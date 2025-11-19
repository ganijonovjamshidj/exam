import app from './app.js';
import dotenv from 'dotenv';
import logger from './config/loggerConfig.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
