import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js'
import { getUserValidation } from '../validations/user.js'
import { validationResult } from 'express-validator'

const router = express.Router()

// GET all users with pagination
router.get('/', getUsers)

// GET user by ID with validation
router.get('/:id', getUserValidation, (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}, getUserById)


router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
