const multer = require('multer');
const iconv = require('iconv-lite');

const storage = multer.diskStorage({
  // 文件储存路径
  destination(req, file, cb) {
    cb(null, 'public/upload');
  },
  // 名称替换
  filename(req, file, cb) {
    const newNameBuffer = Buffer.from(file.originalname, 'binary');
    const newName = iconv.decode(newNameBuffer, 'utf8');
    cb(null, newName);
  },
});

const uploadFileMiddleware = multer({ storage });

module.exports = uploadFileMiddleware;
