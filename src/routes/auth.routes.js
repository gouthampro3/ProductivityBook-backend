const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const asyncMiddleware = require('../middlewares/async.middleware');
const validate = require('../middlewares/validator.middleware');

router.post('/signin', validate('authValidators', 'validateSignin'), asyncMiddleware(authController.signinFlow));

router.post('/signup', validate('authValidators', 'validateSignup'), asyncMiddleware(authController.signupFlow));

module.exports = router;