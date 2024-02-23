// 系统设置模块路由
// 导入express框架
const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入set的路由处理模块
const setHandler = require('../handler/setting');
const tokenAuthentication = require('../middlewares/tokenAuthentication');
const upload = require('../middlewares/uploadFileMiddleware');

// 上传轮播图
router.post('/uploadSwiper', tokenAuthentication, upload.any(), setHandler.uploadSwiper);
// 获取所有轮播图
router.post('/getAllSwiper', tokenAuthentication, setHandler.getAllSwiper);
// 修改公司名称
router.post('/changeCompanyName', tokenAuthentication, setHandler.changeCompanyName);
// 获取公司名称
router.post('/getCompanyName', tokenAuthentication, setHandler.getCompanyName);
// 修改公司介绍
router.post('/changeCompanyIntroduce', tokenAuthentication, setHandler.changeCompanyIntroduce);
// 获取公司信息
router.post('/getCompanyIntroduce', tokenAuthentication, setHandler.getCompanyIntroduce);
// 部门设置
router.post('/setDepartment', setHandler.setDepartment);
// 获取部门
router.post('/getDepartment', setHandler.getDepartment);
// 产品设置
router.post('/setProduct', setHandler.setProduct);
// 获取产品
router.post('/getProduct', setHandler.getProduct);

// 向外暴露路由
module.exports = router;
