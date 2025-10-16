import pool from '../config/db.js'

export const createBoard = async (req, res) => {
  try {
    const { title, columns } = req.body

    if (!title || !columns || !Array.isArray(columns) || columns.length === 0) {
      return res.status(400).json({ message: 'Board nomi va ustunlar majburiy' })
    }

    const result = await pool.query(
      'INSERT INTO boards (title, columns, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [title, JSON.stringify(columns)]
    )

    res.status(201).json({ board: result.rows[0], message: 'Board yaratildi' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const getBoards = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await pool.query(
      'SELECT * FROM boards ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    )

    const totalResult = await pool.query('SELECT COUNT(*) FROM boards')
    const total = parseInt(totalResult.rows[0].count)

    res.json({ page, limit, total, boards: result.rows })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const updateBoard = async (req, res) => {
  try {
    const { id } = req.params
    const { title, columns } = req.body

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri Board ID' })
    }

    if (!title && !columns) {
      return res.status(400).json({ message: 'Yangilash uchun title yoki columns kerak' })
    }

    const existing = await pool.query('SELECT * FROM boards WHERE id = $1', [id])
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: 'Board topilmadi' })
    }

    const updated = await pool.query(
      'UPDATE boards SET title = COALESCE($1, title), columns = COALESCE($2, columns), updated_at = NOW() WHERE id = $3 RETURNING *',
      [title, columns ? JSON.stringify(columns) : null, id]
    )

    res.json({ message: 'Board yangilandi', board: updated.rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const deleteBoardById = async (req, res) => {
  try {
    const { id } = req.params

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri Board ID' })
    }

    const result = await pool.query(
      'DELETE FROM boards WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Board topilmadi' })
    }

    res.json({ message: 'Board ochirildi', board: result.rows[0] })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}