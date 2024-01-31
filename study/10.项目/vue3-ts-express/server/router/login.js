const express = require('express');

const router = express.Router();
const expressJoi = require('@escook/express-joi');
const loginHandler = require('../handler/login');
const { loginLimit } = require('../joi/login');

// 注册
router.post('/register', expressJoi(loginLimit), loginHandler.register);
// 登录
router.post('/login', expressJoi(loginLimit), loginHandler.login);

module.exports = router;
