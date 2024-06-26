// 导入express框架
const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入expressJoi
const expressJoi = require('@escook/express-joi');

// 导入userinfo的路由处理模块
const userinfoHandler = require('../handler/userinfo');
// 导入验证规则
const {
  passwordLimit,
  nameLimit,
  emailLimit,
  forgetPasswordLimit, addAdminLimit, updateAdminLimit,
} = require('../joi/user');
const tokenAuthentication = require('../middlewares/tokenAuthentication');

// 文件上传中间件
const upload = require('../middlewares/uploadFileMiddleware');
// 更新时间添加中间件
const updateTimeMiddleware = require('../middlewares/updateTimeMiddleware');

// 上传头像
router.post('/uploadAvatar', tokenAuthentication, upload.single('avatar'), userinfoHandler.uploadAvatar);
// 绑定账号
router.post('/bindAccount', tokenAuthentication, userinfoHandler.bindAccount);

// sign 用户管理
// 修改用户密码 changePassword
router.post('/changePassword', tokenAuthentication, expressJoi(passwordLimit), userinfoHandler.changePassword, updateTimeMiddleware);
// 获取用户信息
router.post('/getUserInfo', tokenAuthentication, userinfoHandler.getUserInfo);
// 修改姓名 changeName
router.post('/changeName', tokenAuthentication, expressJoi(nameLimit), userinfoHandler.changeName, updateTimeMiddleware);
// 修改性别
router.post('/changeSex', tokenAuthentication, userinfoHandler.changeSex, updateTimeMiddleware);
// 修改邮箱
router.post('/changeEmail', tokenAuthentication, expressJoi(emailLimit), userinfoHandler.changeEmail, updateTimeMiddleware);
// 验证账号与邮箱 verifyAccountAndEmail
router.post('/verifyAccountAndEmail', userinfoHandler.verifyAccountAndEmail);
// 登录页面修改密码 changePasswordInLogin
router.post('/changePasswordInLogin', expressJoi(forgetPasswordLimit), userinfoHandler.changePasswordInLogin, updateTimeMiddleware);

// todo
// 添加管理员
router.post('/createAdmin', tokenAuthentication, expressJoi(addAdminLimit), userinfoHandler.createAdmin);
// 获取管理员列表
router.post('/getAdminList', tokenAuthentication, userinfoHandler.getAdminList);
// 编辑管理员账号信息
router.post('/editAdmin', tokenAuthentication, expressJoi(updateAdminLimit), userinfoHandler.editAdmin);
// 对管理员取消赋权
router.post('/changeIdentityToUser', userinfoHandler.changeIdentityToUser);
// 对用户进行赋权
router.post('/changeIdentityToAdmin', userinfoHandler.changeIdentityToAdmin);
// 通过账号对用户搜索
router.post('/searchUser', userinfoHandler.searchUser);
// 通过部门对用户搜索
router.post('/searchUserByDepartment', userinfoHandler.searchUserByDepartment);
// 冻结用户
router.post('/banUser', userinfoHandler.banUser);
// 解冻用户
router.post('/hotUser', userinfoHandler.hotUser);
// 获取冻结用户列表
router.post('/getBanList', userinfoHandler.getBanList);
// 删除用户 deleteUser
router.post('/deleteUser', userinfoHandler.deleteUser);
// 获取对应身份的一个总人数
router.post('/getAdminListLength', userinfoHandler.getAdminListLength);
// 监听换页返回数据
router.post('/returnListData', userinfoHandler.returnListData);

// 向外暴露路由
module.exports = router;
