const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/test', (req, res, next) => {
  res.send('用户测试');
});

module.exports = router;
