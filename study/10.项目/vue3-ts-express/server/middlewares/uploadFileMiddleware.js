const multer = require('multer');

const uploadFileMiddleware = (req, res, next) => {
  // dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
  const upload = multer({ dest: 'public/upload' }).any();
  upload(req, res, (err) => {
    if (err) {
      res.error(err);
    } else {
      // 将文件信息赋值到req.body中，继续执行下一步
      req.body.photo = req.file.filename;
      next();
    }
  });
};

module.exports = uploadFileMiddleware;
