const db = require('../db/index');

// 上传轮播图 需要两个参数  set_value set_name
exports.uploadSwiper = async (req, res) => {
  try {
    const { fieldname, filename } = req.files[0];
    const updateSql = 'update setting set set_value = ? where set_name = ?';
    const value = process.env.IMAGE_BASE_URL + filename;
    const [updateData] = await db.query(updateSql, [value, fieldname]);
    if (updateData.affectedRows !== 1) return res.error('上传轮播图失败');
    res.success('上传成功', { fieldname, url: process.env.IMAGE_BASE_URL + filename });
  } catch (e) {
    res.error('上传失败', e.toString());
  }
};

// 获取所有轮播图
exports.getAllSwiper = async (req, res) => {
  try {
    const selectSql = 'select * from setting where set_name like \'swiper%\' ';
    const [queryData] = await db.query(selectSql) || [];
    res.success('查询成功', queryData);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};

// 获取公司名称
exports.getCompanyName = async (req, res) => {
  try {
    const selectSql = 'select * from setting where set_name = "companyName"';
    const [queryData] = await db.query(selectSql) || [];
    res.success('查询成功', queryData[0]);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};

// 修改公司名称 参数 set_value
exports.changeCompanyName = async (req, res) => {
  try {
    const { companyName } = req.body;
    const updateSql = 'update setting set set_value = ? where set_name = "companyName"';
    const [updateData] = await db.query(updateSql, companyName);
    if (updateData.affectedRows !== 1) return res.error('修改公司名称失败');
    res.success('修改成功');
  } catch (e) {
    res.error('修改失败', e.toString());
  }
};

// 编辑公司介绍的接口 参数 set_text set_name
exports.changeCompanyIntroduce = async (req, res) => {
  try {
    const bodyKeys = Object.keys(req.body);

    // 检查是否有必要的字段
    if (bodyKeys.length === 0) return res.error('缺少必要的字段');

    const updatePromises = bodyKeys.map(async (key) => {
      const setText = req.body[key];
      const setName = key;

      const updateSql = 'update setting set set_text = ? where set_name = ?';
      const [updateData] = await db.query(updateSql, [setText, setName]);

      if (updateData.affectedRows !== 1) return Promise.reject(new Error(`修改 ${setName} 失败，字段不存在`));

      return Promise.resolve({
        set_name: setName,
        set_text: setText,
      });
    });

    // 执行所有更新操作
    const data = await Promise.all(updatePromises);

    res.success('修改成功', data);
  } catch (e) {
    res.error('修改失败', e.toString());
  }
};

// 获取公司介绍 参数 set_name
exports.getCompanyIntroduce = async (req, res) => {
  try {
    const { setName } = req.body;
    let selectSql = 'SELECT * FROM setting';

    if (setName) {
      selectSql += ' WHERE set_name = ?';
    } else {
      selectSql += ' WHERE set_name LIKE ?';
    }

    const searchParam = setName ? [setName] : ['%company%'];
    const [queryData] = await db.query(selectSql, searchParam) || [];
    res.success('查询成功', queryData);
  } catch (e) {
    res.error('查询失败', e.toString());
  }
};

// todo

// -----其他设置
// 部门设置 数组
exports.setDepartment = (req, res) => {
  const sql = 'update setting set set_value = ? where set_name = "部门设置" ';
  db.query(sql, req.body.set_value, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '部门设置成功',
    });
  });
};

// 获取部门
exports.getDepartment = (req, res) => {
  const sql = 'select set_value from setting where set_name = "部门设置"';
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result[0].set_value);
  });
};

// 产品设置 数组
exports.setProduct = (req, res) => {
  const sql = 'update setting set set_value = ? where set_name = "产品设置" ';
  db.query(sql, req.body.set_value, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '产品设置成功',
    });
  });
};

// 获取产品
exports.getProduct = (req, res) => {
  const sql = 'select set_value from setting where set_name = "产品设置"';
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send(result[0].set_value);
  });
};
