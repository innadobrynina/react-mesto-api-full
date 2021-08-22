const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Необходимо авторизоваться'));
  }

  let payload;

  try {
    payload = jwt.verify(token, req.app.locals.jwtKey);
  } catch (err) {
    return next(new AuthError('Неверный токен'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
