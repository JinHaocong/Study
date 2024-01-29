const express = require('express');

const router = express.Router();

const loginHandler = require('../handler/login');

// 注册
router.post('/register', loginHandler.register);
// 登录
router.post('/login', loginHandler.login);

module.exports = router;
