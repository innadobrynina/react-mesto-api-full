/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');

// возвращаем всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// возвращаем пользователя по id
const getUserId = (req, res, next) => {
  console.log(req.params);
  console.log(req.user);
  console.log(req.query);
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный запрос'));
      }
      return next(err);
    });
};

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => {
      User.create({
        email,
        password: encryptedPassword,
        name,
        about,
        avatar,
      })
        // eslint-disable-next-line no-unused-vars
        .then((user) => {
          res.status(200).send({
            email,
            name,
            about,
            avatar,
          });
        })
        .catch((err) => {
          if (!email || !password) {
            return next(new BadRequestError('Вы не заполнили обязательные поля'));
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            return next(new ConflictError('Пользователь с такой почтой уже существует'));
          }
          return next(err);
        });
    });
};

// обновляем профиль пользователя
const patchUser = (req, res, next) => {
  const { name, about } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

// обновляем аватар
const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(' Пользователя, чей аватар вы пытаетесь изменить, нет в базе'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            req.app.locals.jwtKey,
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
            .status(201).send({
              message: 'Аутентификация прошла успешно',
            });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такого пользователя нет в базе'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Вы прислали странный запрос'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers, getUserId, createUser, patchUser, patchAvatar, login, getCurrentUser,
};
