module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка, попробуйте ещё раз'
        : message,
    });
  next();
};

// добавить сюда еще один обработчик от Макса.
