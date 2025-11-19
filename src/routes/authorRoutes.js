import express from 'express';
import * as authorController from '../controllers/authorController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { authorValidation } from '../validations/authorValidation.js';

const router = express.Router();

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.post('/', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(authorValidation), authorController.createAuthor);
router.put('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(authorValidation), authorController.updateAuthor);
router.delete('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), authorController.deleteAuthor);

export default router;
