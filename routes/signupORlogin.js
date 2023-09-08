const express = require('express');
const routes = express.Router();
const add = require('../controller/singupORlogin');

routes.post('/signup',add.signup);

routes.post('/login',add.login)

module.exports = routes;