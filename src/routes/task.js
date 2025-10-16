import express from 'express'
import { createTask, getTasks } from '../controllers/taskController.js'
import { createTaskValidation } from '../validations/task.js'
import { validationResult } from 'express-validator'

const router = express.Router()

router.post('/', createTaskValidation, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    next()
}, createTask)

router.get('/', getTasks)

export default router
