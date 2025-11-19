import express from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeMiddleware from '../middlewares/authorizeMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { signupValidation } from '../validations/authValidation.js'; // foydalanuvchi yaratishda xuddi signup validation ishlatiladi

const router = express.Router();

router.get('/', authMiddleware, authorizeMiddleware(['admin']), userController.getAllUsers);
router.get('/:id', authMiddleware, authorizeMiddleware(['admin']), userController.getUserById);
router.post('/', authMiddleware, authorizeMiddleware(['admin']), validate(signupValidation), userController.createUser);
router.put('/:id', authMiddleware, authorizeMiddleware(['admin']), validate(signupValidation), userController.updateUser);
router.delete('/:id', authMiddleware, authorizeMiddleware(['admin']), userController.deleteUser);

export default router;
