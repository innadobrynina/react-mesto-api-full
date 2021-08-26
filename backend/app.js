const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');

const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { validateEmailAndPassword, validateRegistration } = require('./middlewares/celebrate');

const noSuchPageRouter = require('./routes/noSuchPage');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://indob.nomoredomains.monster',
  'http://indob.nomoredomains.monster',
  'localhost:3000',
];

app.locals.jwtKey = 'secret-key';

app.use(cookieParser());
app.use(errors());
app.use(helmet());
app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/signin', validateEmailAndPassword, login);
app.post('/signup', validateRegistration, createUser);

app.use(auth);

app.use('/', usersRoutes);

app.use('/', cardsRoutes);

app.use('/', noSuchPageRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Запустился!!'));
