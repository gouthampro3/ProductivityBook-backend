const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/auth.middleware');
const asyncMiddleware = require('../middlewares/async.middleware');
const validate = require('../middlewares/validator.middleware');

const todoController = require('../controllers/todo.controller');

// router.get('/', [authorize, checkaccess])

// Todos
router.get('/',[authorize],asyncMiddleware(todoController.getTodoFlow));
router.put('/',[authorize],asyncMiddleware(todoController.createTodoFlow));
router.delete('/:id',[authorize],asyncMiddleware(todoController.deleteTodoFlow));
module.exports = router;