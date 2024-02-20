// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs');
// 导入node.js的crypto库生成uuid
const crypto = require('crypto');
// 导入fs处理文件
const fs = require('fs');
// 导入iconv-lite处理中文乱码
const iconv = require('iconv-lite');
// 导入数据库
const db = require('../db/index');

// 验证账户和与邮箱是否一致 email account
exports.verifyAccountAndEmail = async (req, res) => {
  try {
    const { account, email } = req.body;
    const verifySQL = 'select * from users where account = ?';
    const [queryData] = await db.query(verifySQL, account) || [];
    if (!queryData.length) return res.error('账号不存在');
    if (email === queryData[0].email) return res.success('身份验证成功', { id: queryData[0].id });
    return res.error('邮箱不一致');
  } catch (e) {
    res.error('查询失败', e);
  }
};

// 登录页面修改密码 参数 newPassword id
exports.changePasswordInLogin = async (req, res) => {
  try {
    const user = req.body;
    user.newPassword = bcrypt.hashSync(user.newPassword, 10);
    const updateSQL = 'update users set password = ? where id = ?';
    const [queryData] = await db.query(updateSQL, [user.newPassword, user.id]) || {};
    return res.success('修改成功', queryData);
  } catch (e) {
    res.error('修改失败', e);
  }
};

// 上传头像
exports.uploadAvatar = async (req, res) => {
  try {
    // step 1：生成唯一标识
    const onlyId = crypto.randomUUID();
    // step 2：插入数据库
    const insertSql = 'insert into image set ?';
    const avatarInfo = {
      image_url: process.env.IMAGE_BASE_URL + req.file.filename,
      onlyId,
    };

    const [insertData] = await db.query(insertSql, avatarInfo);
    if (insertData.affectedRows !== 1) return res.error('上传失败');
    res.success('上传成功', avatarInfo);
  } catch (e) {
    res.error('上传失败', e);
  }
};

// 将上传头像的onlyId绑定到账号
exports.bindAccount = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { account, onlyId, url } = req.body;

    // step 1：开启事务
    await connection.beginTransaction();

    // step 2：更新image表
    const updateSql1 = 'update image set account = ? where onlyId = ?';
    const updateImagePromise = db.query(updateSql1, [account, onlyId]);

    // step 3：更新user表
    const updateSql2 = 'update users set image_url = ? where account = ?';
    const updateUserPromise = db.query(updateSql2, [url, account]);

    // Use Promise.all to wait for both updates to complete
    const [queryData1, queryData2] = await Promise.all([updateImagePromise, updateUserPromise]);

    // Check if both updates were successful
    if (queryData1[0].affectedRows !== 1 || queryData2[0].affectedRows !== 1) {
      await connection.rollback();
      return res.error('头像更换失败');
    }

    // step 4：提交事务
    await connection.commit();

    res.success('头像更换成功');
  } catch (e) {
    await connection.rollback();
    res.error('上传头像失败', e);
  } finally {
    // step 5：释放连接，将连接归还给连接池
    connection.release();
  }
};

// 获取用户信息 接收参数 id
exports.getUserInfo = async (req, res) => {
  try {
    const selectSql = 'select * from users where id = ?';
    const [queryData] = await db.query(selectSql, req.body.id) || [];
    res.success('查询成功', queryData[0]);
  } catch (e) {
    req.error('获取用户信息失败', e);
  }
};

// 修改姓名 接收参数 id name
exports.changeName = async (req, res) => {
  try {
    const { name, id } = req.body;
    const updateSql = 'update users set name = ? where id = ?';
    const [queryData] = await db.query(updateSql, [name, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e);
  }
};

// 修改性别 接收参数 id sex
exports.changeSex = async (req, res) => {
  try {
    const { sex, id } = req.body;
    const updateSql = 'update users set sex = ? where id = ?';
    const [queryData] = await db.query(updateSql, [sex, id]);
    if (queryData.affectedRows !== 1) return res.error('修改失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e);
  }
};

// todo
// 修改用户密码 先输入旧密码 oldPassword 新密码 newPassword id
exports.changePassword = (req, res) => {
  const sql = 'select password from users where id = ?';
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    // bcrypt
    const compareResult = bcrypt.compareSync(req.body.oldPassword, result[0].password);
    if (!compareResult) {
      return res.send({
        status: 1,
        message: '原密码错误',
      });
    }
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const sql1 = 'update users set password = ? where id = ?';
    db.query(sql1, [req.body.newPassword, req.body.id], (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: '修改成功',
      });
    });
  });
};

// 修改邮箱 接收参数 id email
exports.changeEmail = (req, res) => {
  const {
    id,
    email,
  } = req.body;
  const sql = 'update users set email = ? where id = ?';
  db.query(sql, [email, id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '修改成功',
    });
  });
};

// ----------------------------------------用户管理
// 添加管理员
exports.createAdmin = (req, res) => {
  const {
    account,
    password,
    name,
    sex,
    department,
    email,
    identity,
  } = req.body;
  // 判断账号是否存在与数据库中
  const sql = 'select * from users where account = ?';
  db.query(sql, account, (err, results) => {
    // 判断账号是否存在
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: '账号已存在',
      });
    }
    const hashpassword = bcrypt.hashSync(password, 10);
    // 第四步,把账号跟密码插入到users表里面
    const sql1 = 'insert into users set ?';
    // 创建时间
    const create_time = new Date();
    db.query(sql1, {
      account,
      password: hashpassword,
      name,
      sex,
      department,
      email,
      // 身份
      identity,
      // 创建时间
      create_time,
      // 初始未冻结状态为0
      status: 0,
    }, (err, results) => {
      // 第一个,插入失败
      // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
      if (results.affectedRows !== 1) {
        return res.send({
          status: 1,
          message: '添加管理员失败',
        });
      }
      res.send({
        status: 0,
        message: '添加管理员成功',
      });
    });
  });
};

// 获取管理员列表 参数是 identity
exports.getAdminList = (req, res) => {
  const sql = 'select * from users where identity = ?';
  db.query(sql, req.body.identity, (err, result) => {
    if (err) return res.cc(err);
    result.forEach((e) => {
      e.password = '';
      e.create_time = '';
      e.image_url = '';
      e.status = '';
    });
    res.send(result);
  });
};
// 编辑管理员账号信息
exports.editAdmin = (req, res) => {
  const {
    id,
    name,
    sex,
    email,
    department,
  } = req.body;
  const date = new Date();
  const sql0 = 'select department from users where id = ?';
  db.query(sql0, id, (err, result) => {
    if (result[0].department == department) {
      // 修改的内容
      const updateContent = {
        id,
        name,
        sex,
        email,
        department,
        update_time: date,
      };
      const sql = 'update users set ? where id = ?';
      db.query(sql, [updateContent, updateContent.id], (err, result) => {
        if (err) return res.cc(err);
        res.send({
          status: 0,
          message: '修改管理员信息成功',
        });
      });
    } else {
      // 修改的内容
      const updateContent = {
        id,
        name,
        sex,
        email,
        department,
        update_time: date,
        read_list: null,
        read_status: 0,
      };
      const sql = 'update users set ? where id = ?';
      db.query(sql, [updateContent, updateContent.id], (err, result) => {
        if (err) return res.cc(err);
        res.send({
          status: 0,
          message: '修改管理员信息成功',
        });
      });
    }
  });
};

// 对管理员取消赋权 参数 id
exports.changeIdentityToUser = (req, res) => {
  const identity = '用户';
  const sql = 'update users set identity = ? where id = ?';
  db.query(sql, [identity, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '降级成功',
    });
  });
};

// 对用户进行赋权 参数 id identity
exports.changeIdentityToAdmin = (req, res) => {
  const date = new Date();
  const sql = 'update users set identity = ?,update_time = ? where id = ?';
  db.query(sql, [req.body.identity, date, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '赋权成功',
    });
  });
};

// 通过账号对用户搜索 account identity
exports.searchUser = (req, res) => {
  const { account, identity } = req.body;
  const sql = 'select * from users where account = ? and identity = ?';
  db.query(sql, [account, identity], (err, result) => {
    if (err) return res.cc(err);
    result.forEach((e) => {
      e.password = '';
      e.create_time = '';
      e.image_url = '';
      e.status = '';
    });
    res.send(result);
  });
};

// 通过部门对用户搜索 department
exports.searchUserByDepartment = (req, res) => {
  const sql = 'select * from users where department = ? and identity = "用户"';
  db.query(sql, req.body.department, (err, result) => {
    if (err) return res.cc(err);
    result.forEach((e) => {
      e.password = '';
      e.image_url = '';
    });
    res.send(result);
  });
};

// 冻结用户 通过id 把status 置为 1
exports.banUser = (req, res) => {
  const status = 1;
  const sql = 'update users set status = ? where id = ?';
  db.query(sql, [status, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '冻结成功',
    });
  });
};

// 解冻用户
exports.hotUser = (req, res) => {
  const status = 0;
  const sql = 'update users set status = ? where id = ?';
  db.query(sql, [status, req.body.id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '解冻成功',
    });
  });
};

// 获取冻结用户列表
exports.getBanList = (req, res) => {
  const sql = 'select * from users where status = "1" ';
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};

// 删除用户 id account
exports.deleteUser = (req, res) => {
  const sql = 'delete from users where id = ?';
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.cc(err);
    const sql1 = 'delete from image where account = ?';
    db.query(sql1, req.body.account, (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: '删除用户成功',
      });
    });
  });
};

// 获取对应身份的一个总人数 identity
exports.getAdminListLength = (req, res) => {
  const sql = 'select * from users where identity = ? ';
  db.query(sql, req.body.identity, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      length: result.length,
    });
  });
};

// 监听换页返回数据 页码 pager identity
// limit 10 为我们要拿到数据 offset 我们跳过多少条数据
exports.returnListData = (req, res) => {
  const number = (req.body.pager - 1) * 10;
  const sql = `select * from users where identity = ? ORDER BY create_time limit 10 offset ${number} `;
  db.query(sql, req.body.identity, (err, result) => {
    if (err) return res.cc(err);
    res.send(result);
  });
};
