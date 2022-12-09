const logger = require('../utils/logger');
const debugErr = require('debug')('app:error')

function errorHandlerMiddleware(err, req, res, next){

    logger.error(err.message);
    debugErr(err.message, err);
    
    if(err.code = 400){
        return res.status(400).send({"error":"err.message"});
    }
    return res.status(500).send({"error":err.message});
}


module.exports = errorHandlerMiddleware;