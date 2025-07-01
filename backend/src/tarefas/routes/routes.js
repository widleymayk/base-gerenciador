const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

//Rotas e métodas correspondentes no controlador

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;