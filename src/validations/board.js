import { body } from 'express-validator'

export const createBoardValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('columns').isArray({ min: 1 }).withMessage('Columns must be an array with at least one element')
]
