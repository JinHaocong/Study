const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/index');
const jwtConfig = require('../jwt_config/index');

exports.register = async (req, res) => {
  try {
    // step 1：检查账号或密码是否为空
    const { account, password } = req.body;
    if (!account || !password) return res.error('账号或者密码不能为空');

    // step 2：检查账号是否已经存在
    const querySQL = 'SELECT * FROM users WHERE account = ?';
    const [queryData] = await db.query(querySQL, account) || [];

    if (queryData.length) return res.error('账号已存在');

    // step 3：加密密码
    const encryptedPassword = bcrypt.hashSync(password, 10);

    // step 4：将账号和加密后的密码插入到users表中
    const insertSQL = 'INSERT INTO users SET ?';
    const userInfo = {
      account,
      password: encryptedPassword,
      identity: '用户',
      create_time: new Date(),
      status: 0,
    };

    const [insertData] = await db.query(insertSQL, userInfo);

    // 确保之影响一行数据
    if (insertData.affectedRows !== 1) return res.error('注册账号失败');

    res.success('注册账号成功');
  } catch (e) {
    res.error('注册账号失败', e);
  }
};

exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;

    // step 1：查看数据表中有没有前端传过来的账号
    const querySQL = 'select * from users where account = ?';
    const [queryData] = await db.query(querySQL, account) || [];
    if (!queryData.length) return res.error('登录失败：用户不存在');

    // step 2：对前端传过来的密码进行解密
    const compareResult = bcrypt.compareSync(password, queryData[0].password);
    if (!compareResult) return res.error('登录失败：密码错误');

    // step 3：对账号是否冻结做判定
    if (queryData[0].status === '1') return res.error('登录失败：账号被冻结');

    // step 4：生成返回给前端的token 剔除加密后的密码,头像,创建时间,更新时间
    const user = {
      ...queryData[0],
      password: '',
      imageUrl: '',
      create_time: '',
      update_time: '',
    };
    // 设置token的有效时长 有效期为7个小时
    const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, {
      expiresIn: '7h',
    });
    res.token('登录成功', tokenStr, queryData[0]);
  } catch (e) {
    return res.error('登录失败', e);
  }
};
