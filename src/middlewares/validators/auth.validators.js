const Joi = require('joi');
const debug = require('debug')('app:dev');

function validateSignin (req){
    const schema = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().max(255).required(),
    });
    const result = schema.validate(req.body);
    return result;
}

function validateSignup (req){
    const schema = Joi.object({
        firstname: Joi.string().min(1).max(50).required(),
        lastname: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(50).required(),
        confirmPassword:Joi.string().min(8).max(50).required()
    });

    const result = schema.validate(req.body);
    return result;
}

module.exports = {validateSignin, validateSignup}