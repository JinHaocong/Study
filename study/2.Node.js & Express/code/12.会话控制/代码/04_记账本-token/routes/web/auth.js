const express = require('express');

const router = express.Router();
const md5 = require('md5');
const UserModel = require('../../models/UserModel');

router.get('/reg', (req, res) => {
  res.render('auth/reg');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/reg', async (req, res) => {
  try {
    await UserModel.create({ ...req.body, password: md5(req.body.password) });
    res.render('success', { msg: '注册成功', url: '/login' });
  } catch (err) {
    res.status(500).send('注册失败');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userInfo = await UserModel.findOne({
      username,
      password: md5(password),
    });
    if (userInfo) {
      req.session.username = userInfo.username;
      req.session.password = userInfo.password;
      req.session._id = userInfo._id;
      res.render('success', { msg: '登陆成功~~', url: '/account' });
    } else {
      res.render('success', { msg: '无此用户~~', url: '/reg' });
    }
  } catch (err) {
    res.status(500).send('登陆失败~~');
  }
});

router.post('/logout', async (req, res) => {
  await req.session.destroy();
  res.render('success', { msg: '退出成功', url: '/login' });
});

module.exports = router;
