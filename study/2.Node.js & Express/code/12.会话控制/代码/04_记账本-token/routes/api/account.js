const express = require('express');

const router = express.Router();
// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleWare = require('../../middleWares/checkTokenMiddleWare');

router.get('/', (req, res) => {
  res.redirect('/account');
});

// 记账本的列表
router.get('/account', checkTokenMiddleWare, async (req, res) => {
  try {
    // 获取所有的账单信息
    const accounts = await AccountModel.find({})
      .sort({ time: -1 })
      .exec(undefined);
    res.json({
      code: 200,
      msg: '操作成功！',
      data: accounts,
    });
  } catch (e) {
    console.log(e, '查找失败');
    res.json({
      code: 500,
      msg: e,
      data: null,
    });
  }
});

// 添加记录
router.get('/account/create', checkTokenMiddleWare, (req, res) => {
  res.render('create');
});

// 新增记录
router.post('/account', checkTokenMiddleWare, async (req, res) => {
  try {
    const newData = await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    });
    // 成功提醒
    res.json({
      code: 200,
      msg: '操作成功！',
      data: newData,
    });
    res.render('success', { msg: '添加成功哦~~~', url: '/account' });
  } catch (e) {
    console.log(e, '添加失败');
    res.json({
      code: 500,
      msg: e,
      data: null,
    });
  }
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleWare, async (req, res) => {
  try {
    // 获取 params 的 id 参数
    const { id } = req.params;
    // 删除
    const delData = await AccountModel.deleteOne({ _id: id });
    // 成功提醒
    res.json({
      code: 200,
      msg: '操作成功！',
      data: delData,
    });
    // 提醒
    res.render('success', { msg: '删除成功~~~', url: '/account' });
  } catch (e) {
    console.log(e, '删除失败');
    res.json({
      code: 500,
      msg: e,
      data: null,
    });
  }
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
    // 获取所有的账单信息
    const accounts = await AccountModel.findById(id);
    res.json({
      code: 200,
      msg: '操作成功！',
      data: accounts,
    });
  } catch (e) {
    console.log(e, '查找失败');
    res.json({
      code: 500,
      msg: e,
      data: null,
    });
  }
});

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
    // 获取所有的账单信息
    const accounts = await AccountModel.updateOne({ _id: id }, req.body);
    res.json({
      code: 200,
      msg: '操作成功！',
      data: accounts,
    });
  } catch (e) {
    console.log(e, '查找失败');
    res.json({
      code: 500,
      msg: e,
      data: null,
    });
  }
});

module.exports = router;
