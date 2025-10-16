import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import boardRoutes from './routes/board.js'
import taskRoutes from './routes/task.js'

dotenv.config()

const app = express()

app.use(express.json({ limit: '1mb' }))

app.get('/', (req, res) => res.send('Trello Node.js xizmati ishga tushdi'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/tasks', taskRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint topilmadi' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`))
