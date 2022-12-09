const debug = require('debug')('app:dev');
const logger = require('../utils/logger');
const _ = require('lodash');
const mongoose  = require('mongoose');

const User = require('../models/user');

async function checkUserEmailExists(email){
    let user = await User.findOne({email:email});
    return user;
}

async function checkUserExists(id){
    let user = await User.findOne({_id:id});
    return user;
}

// Creating different types of users
async function createUser(req){
    let user = new User(_.pick(
            req.body, [
                "firstname", 
                "middlename", 
                "lastname", 
                "email", 
                "password",
            ]
        ));
    await user.save();
    return user;
}

async function getUser(req){
    if(req.params.uid){
        let user = await User.findOne({_id:req.params.uid});
        if(!user){
            return user;
        }
        user = await user.populate('profile');
        return user;
    }
    
}

async function updateUser(req){
    try{
        let updateData = _.pick(req.body,['firstname', 'middlename', 'lastname', 'phone']);
        let user = await User.findOneAndUpdate({_id:req.params.uid}, updateData, {new:true});
        if(!user){
            return user;
        }
        user = await user.populate('profile')
        return user;
    }
    catch(error){
        logger.error(error);
        return null;
    }
    // const session = await
}

module.exports = {
    createUser,
    checkUserEmailExists,
    getUser,
    checkUserExists,
    updateUser,
}