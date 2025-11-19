import express from 'express';
import * as borrowController from '../controllers/borrowController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { borrowValidation } from '../validations/borrowValidation.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeMiddleware(['librarian', 'admin']), borrowController.getAllBorrows);
router.get('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), borrowController.getBorrowById);
router.post('/', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(borrowValidation), borrowController.createBorrow);
router.put('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), validate(borrowValidation), borrowController.updateBorrow);
router.delete('/:id', authMiddleware, authorizeMiddleware(['librarian', 'admin']), borrowController.deleteBorrow);

export default router;
