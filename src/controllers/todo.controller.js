const express = require('express');
const _ = require('lodash');
const debug = require('debug')('app:dev');

const logger = require('../utils/logger');
const validate = require('../middlewares/validator.middleware');
const User = require('../models/user');
const {userServices, todoServices} = require('../services/services');

async function createTodoFlow(req, res, next){
    let todo = await todoServices.createTodo(req);
    if(todo)
        return res.status(200).send({"message":"Todo Created", "body":todo});
    else
        return res.status(500).send({"error":"Unable to create todo"});
}

async function getTodoFlow(req,res,next){
    let todo = await todoServices.getTodosByUserId(req);
    let sharedTodo = await todoServices.getSharedTodosByUserId(req);
    if(todo && sharedTodo)
        return res.status(200).send({"message":"Success", "body":{"own":todo, "shared":sharedTodo}});
    else
        return res.status(500).send({"error":"Unable to get todo"});
}

async function updateTodoFlow(req,res,next){

}

async function deleteTodoFlow(req,res,next){
    let count = await todoServices.deleteTodo(req);
    if(count==0)
        return res.status(200).send({"message":"Success"});
    else
        return res.status(500).send({"error":"Unable to delete todo"});
}

module.exports = {
    createTodoFlow,
    getTodoFlow,
    updateTodoFlow,
    deleteTodoFlow,
}