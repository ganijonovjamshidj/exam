import express from 'express';
import * as bookController from '../controllers/bookController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { bookValidation } from '../validations/bookValidation.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(bookValidation), bookController.createBook);
router.put('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(bookValidation), bookController.updateBook);
router.delete('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), bookController.deleteBook);

export default router;
