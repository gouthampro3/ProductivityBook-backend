const _ = require('lodash');
const debug = require('debug')('app:dev');
const {userServices, authServices} = require('../services/services')

async function signinFlow(req, res, next){
    const user = await authServices.signin(req);
    if(!user){
        return res.status(400).send({"error":"Authentication Failed"});
    }
    const token = await authServices.generateJWT(user);
    return res.status(200).header('x-auth-token', token).send({"message":"Authentication Success", body:_.pick(user, ['_id', 'firstName', 'lastName',  'email'])});
}

async function signupFlow(req, res, next){
    if(await userServices.checkUserEmailExists(req.body.email)){
        return res.status(400).send({"error":"User already exists!"});
    } 
    if(req.body.password!=req.body.confirmPassword){
        return res.status(400).send({"error":"Password and ConfirmPassword donot match!"});
    }
    req.body.password = await authServices.hashPassword(req.body.password);
    let user = await authServices.signup(req, res);
    if(user)
        return res.status(200).send({"message":"User Created", "body":_.pick(user, ['_id', 'firstName', 'lastName', 'email'])});
    else
        return res.status(500).send({"error":"Unable to create user"});
}

module.exports = {
    signinFlow,
    signupFlow
};