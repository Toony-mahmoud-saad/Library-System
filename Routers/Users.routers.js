// Used to record names of api's

const Router = require('express');
const userController = require('../Controllers/Users.controllers')

const router = Router();

router.post('/api/users/register', userController.register);
router.post('/api/users/login', userController.login);

module.exports = router ;

