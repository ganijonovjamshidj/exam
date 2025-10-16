import express from 'express'
import { createBoard, getBoards, updateBoard, deleteBoardById } from '../controllers/boardController.js'

const router = express.Router()

router.post('/', createBoard)
router.get('/', getBoards)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoardById)

export default router
