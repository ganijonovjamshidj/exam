import pool from '../config/db.js'

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    )
    const totalResult = await pool.query('SELECT COUNT(*) FROM users')
    const total = parseInt(totalResult.rows[0].count)

    res.json({ page, limit, total, users: result.rows })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri foydalanuvchi ID' })
    }

    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
    }

    res.json({ user: result.rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
      [name, email]
    )

    res.status(201).json({ user: result.rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri foydalanuvchi ID' })
    }

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at',
      [name, email, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
    }

    res.json({ user: result.rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri foydalanuvchi ID' })
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
    }

    res.json({ message: 'Foydalanuvchi ochirildi' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}
