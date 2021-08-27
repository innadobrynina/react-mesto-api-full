const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
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
  'https://frontend.indob.nomoredomains.monster',
  'http://frontend.indob.nomoredomains.monster',
  'localhost:3000',
  'http://localhost:3000',
];

const corsOptions = {
  origin: [
    'http://frontend.indob.nomoredomains.monster',
    'https://frontend.indob.nomoredomains.monster',
    'localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

app.locals.jwtKey = 'secret-key';

app.use(cors(corsOptions));
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('!!!!!!');
  next();
});

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
  const { origin } = req.headers; // источник запроса - в переменную origin
  const { method } = req; // тип запроса (HTTP-метод) в соотв. переменную
  const requestHeaders = req.headers['access-control-request-headers']; // сохр. список заголовков исходного запроса
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    // уст. заголовок, который разрешает браузеру запросы с этого источника
    // console.log(origin);
    res.header('Access-Control-Allow-Origin', origin);
  }

  // предварительный запрос? - добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими (requestHeaders) заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
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
