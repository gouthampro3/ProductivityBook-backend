const Joi = require('joi');
const express = require('express');


function validateUser (req, res, next){
    const schema = {
        firstname: Joi.string().min(1).max(50).required(),
        lastname: Joi.string().min(1).max(50),
        email: Joi.email().max(255).required(),
    };

    const result = Joi.validate(schema, req.body);

    if(result.error){
        next(result.error);
    }else{
        res.send(result.value);
    }
}

module.exports = {validateUser}