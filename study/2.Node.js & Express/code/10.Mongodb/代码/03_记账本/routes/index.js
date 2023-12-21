const express = require('express');

const router = express.Router();
// 导入 lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const moment = require('moment');
const AccountModel = require('../models/AccountModel');
// 导入moment

const adapter = new FileSync(`${__dirname}/../data/db.json`);
// 获取 db 对象
const db = low(adapter);

router.get('/', (req, res) => {
  res.redirect('/account');
});

// 记账本的列表
router.get('/account', async (req, res, next) => {
  try {
    // 获取所有的账单信息
    const accounts = await AccountModel.find({}).sort({ time: -1 }).exec(undefined);
    res.render('list', { accounts, moment });
  } catch (e) {
    console.log(e, '查找失败');
    res.status(500).send('查找失败');
  }
});

// 添加记录
router.get('/account/create', (req, res, next) => {
  res.render('create');
});

// 新增记录
router.post('/account', async (req, res) => {
  try {
    await AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() });
    // 成功提醒
    res.render('success', { msg: '添加成功哦~~~', url: '/account' });
  } catch (e) {
    console.log(e, '添加失败');
    res.status(500).send('添加失败');
  }
});

// 删除记录
router.get('/account/:id', (req, res) => {
  // 获取 params 的 id 参数
  const { id } = req.params;
  // 删除
  db.get('accounts').remove({ id }).write();
  // 提醒
  res.render('success', { msg: '删除成功~~~', url: '/account' });
});

module.exports = router;
