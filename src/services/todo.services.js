const debug = require('debug')('app:dev');
const logger = require('../utils/logger');
const _ = require('lodash');
const mongoose  = require('mongoose');

const Todo = require('../models/todo');
const user = require('../models/user');

// async function getTodos(req){
//     uid = await authServices.parseJWT(JSON.stringify(req.headers)['x-auth-token'])['_id'];
//     todos = await Todo.findAll();
// }

async function createTodo(req){
    let todo;
    let todoData = req.body;
    _.assign(todoData,{
        owner:req.user["_id"], 
    });
    todo = await new Todo(todoData).save();
    return todo;
}

async function updateTodo(req){
    let todo;
    let todoData = req.body;
    _.assign(todoData,{
        owner:req.user["_id"], 
    });
    todo = await Todo.updateOne({_id:todoData['_id']}, _.pick(todoData, ['subject','description', 'due','status', 'postponedDates', 'sharedWith']));
}

async function getTodosByUserId(req){
    let todos = await Todo.find({owner:req.user["_id"]});
    return todos
}

async function getSharedTodosByUserId(req){
    let todos = await Todo.find({sharedWith:{userid:req.user["_id"]}});
    return todos
}

async function deleteTodo(req){
    await Todo.deleteOne({ _id: req.params['id'] });
    let count = await Todo.countDocuments({ _id: req.params['id'] });
    return count;
}

module.exports = {
    createTodo,
    updateTodo,
    getTodosByUserId,
    getSharedTodosByUserId,
    deleteTodo
}