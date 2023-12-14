const express = require('express')
const path = require('path')
const router = express.Router()
const formidable = require('formidable')

// 默认首页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

// 显示图片上传页面
router.get('/portrait', (req, res) => {
  res.render('portrait')
})

// 处理文件上传
router.post('/portrait', (req, res, next) => {
  handleFileUpload(req, res, next)
})

function handleFileUpload(req, res, next) {
  // 创建 form 对象
  const form = formidable({
    multiples: true,
    // 设置上传文件的保存目录
    uploadDir: path.resolve(__dirname, './../public/images'),
    // 保持文件后缀
    keepExtensions: true
  })

  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      handleUploadError(err, next)
      return
    }

    // console.log(fields) // 包含表单字段，如 text、radio、checkbox、select
    // console.log(files) // 包含文件信息

    // 获取当前请求的主机名和协议
    const host = req.get('host')
    const protocol = req.protocol

    // 构建完整的图片路径
    // 例如：http://localhost:3000/images/8ad3d5e36012212ba7642c000.jpg
    const imageUrl = `${protocol}://${host}/images/${files.portrait.newFilename}`
    console.log(imageUrl)

    // 将来将此数据保存在数据库中,在此可调用数据库操作函数进行保存
    // 渲染带有图片链接的页面
    res.render('portrait-success', { imageUrl })
  })
}

function handleUploadError(err, next) {
  console.error('File upload error:', err)
  next(err)
}

module.exports = router
