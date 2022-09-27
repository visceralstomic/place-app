const express = require('express');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);
router.route('/logout').post(authControllers.logout);

module.exports = router;
