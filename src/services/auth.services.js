const debug = require('debug')('app:dev');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config');

const {userServices} = require('./services');

async function signin(req){
    let user = await userServices.checkUserEmailExists(req.body.email);
    if(!user){
        return null;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        return null;
    }
    return user;
}

async function generateJWT(user){
   const token = jwt.sign(_.pick(user, ['_id','email','firstName', 'lastName']), process.env.AUTH_SECRET);
   return token;WE
}

async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function signup(req){
    let user = await userServices.createUser(req);
    return user;
}

module.exports = {
    signin, signup, hashPassword, generateJWT
};