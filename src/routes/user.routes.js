const express = require('express');
const router = express.Router();

const authorize = require('../middlewares/auth.middleware');
const asyncMiddleware = require('../middlewares/async.middleware');
const validate = require('../middlewares/validator.middleware');

const userController = require('../controllers/user.controller');

// router.get('/', [authorize, checkaccess])

// Users 
router.post('/',[authorize],asyncMiddleware(userController.createUserFlow));

router.post('/',[authorize],asyncMiddleware(userController.getUserFlow));
router.post('/:id',[authorize],asyncMiddleware(userController.getUserFlow));

module.exports = router;