import pool from '../config/db.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Ism, email va parol majburiy' })
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Bu email allaqachon royxatdan otilgan' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, hashedPassword]
    )

    res.status(201).json({ user: result.rows[0], message: 'Foydalanuvchi yaratildi' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parol majburiy' })
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Email yoki parol noto‘gri' })
    }

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Email yoki parol noto‘gri' })
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      message: 'Muvaffaqiyatli kirildi'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}
