const express = require('express');
const _ = require('lodash');
const debug = require('debug')('app:dev');

const logger = require('../utils/logger');
const validate = require('../middlewares/validator.middleware');
const User = require('../models/user');
const {userServices, authServices} = require('../services/services');

async function getUserFlow(req,res,next){
    
}

async function updateUserFlow(req,res,next){

}

async function deleteUserFlow(req,res,next){

}

module.exports = {
    getUserFlow,
    updateUserFlow,
    deleteUserFlow,
}