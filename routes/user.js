//import express
const express = require('express')
const router = express.Router();

//import system packages
const path = require('path')

//import required utilities
const rootDir = require('../util/root-dir')
const validationHelper = require('../util/validation-helper');


//import required controllers
const userController = require(path.join(rootDir,'controllers/user'))

//Create User.
router.post('/create-user',
            validationHelper.validateCreateUserRequest,
            userController.postCreateUser
)

//authenticate user
router.post('/authenticate-user',
            validationHelper.authUserRequest,
            userController.postAuthUser
)

//create eth address
router.get('/create-eth-address',
            validationHelper.authEthRequest,
           userController.getEthAddress
)




module.exports = router;