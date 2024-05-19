const {signUpController} = require('../controller/CreateUser') 

const express = require('express');

createUserRoute = express.Router();

createUserRoute.post('/', signUpController);

module.exports = createUserRoute;