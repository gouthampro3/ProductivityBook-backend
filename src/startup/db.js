const { default: mongoose } = require("mongoose");
const config = require('config');
const logger = require("../utils/logger");
const debug = require('debug')('app:dev');

mongoose.set('strictQuery', true);
module.exports = function(app){
    mongoose.connect(config.get('db.host'), {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
    .then(()=>{
        debug('Connected to Mongo!');
    })
    .catch((err)=>{
        logger.error(err);
        debug(err);
    })
}