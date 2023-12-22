const express = require('express');

const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const { secret } = require('../../config/config');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userInfo = await UserModel.findOne({
      username,
      password: md5(password),
    });
    if (userInfo) {
      const token = jwt.sign({ ...userInfo }, secret, {
        expiresIn: 60,
      });
      res.json({
        code: 200,
        msg: '登陆成功',
        data: token,
      });
    } else {
      res.json({
        code: 202,
        msg: '用户名密码错误',
        data: null,
      });
    }
  } catch (err) {
    res.json({
      code: 500,
      msg: '读取失败！！',
      data: err,
    });
  }
});

router.post('/logout', async (req, res) => {
  await req.session.destroy();
  res.render('success', { msg: '退出成功', url: '/login' });
});

module.exports = router;
