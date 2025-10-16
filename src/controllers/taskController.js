import pool from '../config/db.js'

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body
    const queryText = `
      INSERT INTO tasks (title, description, completed)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const values = [title, description, completed || false]

    const result = await pool.query(queryText, values)
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}


export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'Notogri Task ID' })
    }

    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vazifa topilmadi' })
    }

    res.status(200).json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
  }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!task) return res.status(404).json({ message: 'Vazifa topilmadi' })
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Vazifa topilmadi' })
        res.status(200).json({ message: 'Vazifa muvaffaqiyatli o‘chirildi' })
    } catch (error) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
}
