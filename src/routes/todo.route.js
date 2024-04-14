const {Router} = require('express')
const db = require('../db')

const router = Router()

router.get('/todos', (req, res) => {
    const query = `SELECT * FROM todo`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno en el servidor.' })
        }

        return res.status(201).json(result)
    })
})

router.post('/todo', (req, res) => {
    const { titulo, descripcion, estado } = req.body
    const query = `INSERT INTO todo (titulo, descripcion, estado) VALUES (?,?,?)`;
    db.query(query, [titulo, descripcion, estado], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno en el servidor.' })
        }

        return res.status(201).json({ message: 'Tarea agregada exitosamente.' })
    })
})

router.delete('/delete-todo/:id', (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM todo WHERE id=?`
    db.query(query, id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor ' + err })
        }
        return res.status(200).json({ message: 'Tarea eliminada.' })
    })
})

router.delete('/delete-all', (req, res) => {
    const query = `DELETE FROM todo WHERE estado=1`
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor ' + err })
        }

        return res.status(200).json({ message: 'Las tareas completadas fueron eliminadas.' })
    })
})

router.put('/update-todo/:id', (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, estado } = req.body
    const query = `UPDATE todo SET titulo=?, descripcion=?, estado=? WHERE id=?`;

    db.query(query, [titulo, descripcion, estado, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor ' + err })
        }

        return res.status(200).json({ message: 'Tareas actualizadas con exito.' })
    })
})

module.exports = router;