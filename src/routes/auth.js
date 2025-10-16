import express from 'express'
import { register, login } from '../controllers/authController.js'
import { registerValidation, loginValidation } from '../validations/auth.js'
import { validationResult } from 'express-validator'

const router = express.Router()

router.post('/register', registerValidation, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    next()
}, register)

router.post('/login', loginValidation, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    next()
}, login)

export default router
