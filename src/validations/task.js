import { body } from 'express-validator'

export const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean value')
]
