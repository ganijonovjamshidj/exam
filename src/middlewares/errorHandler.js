export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || '500 xato';

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'ishlash' ? null : err.stack,
  });
};
