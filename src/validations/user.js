import { param } from 'express-validator'

export const getUserValidation = [
  param('id').isInt().withMessage('User id must be an integer')
]
