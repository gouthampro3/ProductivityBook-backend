require('dotenv').config();
const config = require('config');
const debug = require('debug')('app:dev')
const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors');

const logger = require('./src/utils/logger');
const db = require('./src/startup/db');
const authRouter = require('./src/routes/auth.routes');
const userRouter = require('./src/routes/user.routes');
const todoRouter = require('./src/routes/todo.routes');
const errorHandlerMiddleware = require('./src/middlewares/error.middleware');

const app = express();

// For uncaught exceptions
process.on('uncaughtException', (ex)=>{
    debug(ex);
    logger.error(ex.message, ex);
    process.exit(1);
});

// For uncaught exceptions
process.on('unhandledRejection', (ex)=>{
  throw ex;
});

app.use(cors({
  exposedHeaders:['Content-Length', 'x-auth-token']
}))

// for parsing body 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

db(app);

app.use('/',authRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use(errorHandlerMiddleware);

const port = config.get('port') || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));