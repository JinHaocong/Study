const requestMiddleware = (req, res, next) => {
  // status=0为成功,=1为失败,默认设为1,方便处理失败的情况
  res.error = (msg, err = null, status = 1) => {
    res.send({
      status,
      message: msg,
      error: err,
    });
  };

  res.success = (msg, data = [], status = 0) => {
    res.send({
      status,
      message: msg,
      data,
    });
  };

  res.token = (msg, tokenStr, data = [], status = 0) => {
    res.send({
      status,
      message: msg,
      data,
      token: `Bearer ${tokenStr}`,
    });
  };

  next();
};

module.exports = requestMiddleware;
