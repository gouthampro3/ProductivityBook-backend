const debug = require('debug')('app:dev')
const validators = require('./validators')

function validate(validatorModule, validatorFunc){
    if(!(validators.hasOwnProperty(validatorModule) ))
        throw new Error(`'${validatorModule}' validator module does not exist`);
    if(!(validators[validatorModule].hasOwnProperty(validatorFunc) ))
        throw new Error(`'${validatorFunc}' validator function does not exist`);

    return function (req, res, next) {
        const result = validators[validatorModule][validatorFunc](req);
        if(result.error){
            result.error.code = 400;
            next(result.error);
        }
        req.body = result.value
        next();
    }
}

module.exports = validate