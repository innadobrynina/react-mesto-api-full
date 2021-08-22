// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => res.status(err.statusCode || 500).send({
  message: `Ошибка: ${err.message || 'Ошибка на сервере'}`,
});

module.exports = errorHandler;
