import express = require('express');
import db = require('../models')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todoStatuses = await db.TodoStatus.findAll({
      include: [db.Todo]
    })
    res.json(todoStatuses);
  } catch (e) {
    throw e
  }
});

router.post('/create', async (req, res) => {
  try {
    const { todo } = req.body
    const { id } = await db.Todo.create(todo)
    res.json(id)
  } catch (e) {
    throw e
  }
})

router.post('/update', async (req, res) => {
  try {
    const { todo } = req.body
    
    const { id } = await db.Todo.update(todo, {
      where: {
        id: todo.id
      }
    })
    res.json(id)
  } catch (e) {
    throw e
  }
})

router.post('/destroy', async (req, res) => {
  try {
    const { id } = req.body
    await db.Todo.destroy({
      where: {
        id
      }
    })
    res.end()
  } catch (e) {
    throw e
  }
})

module.exports = router