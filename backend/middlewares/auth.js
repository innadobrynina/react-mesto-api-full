const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET = 'secret-key', JWT_DEV = 'dev-key' } = process.env;
  const token = req.cookies.jwt;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV;

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
  } catch (err) {
    return next(new AuthError('Неверный токен'));
  }

  next();
};

module.exports = { auth };