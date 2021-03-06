require('dotenv').config();

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

const corsOptions = {
  origin: [
    'http://frontend.indob.nomoredomains.monster',
    'https://frontend.indob.nomoredomains.monster',
    'localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

app.locals.jwtKey = process.env.JWT_SECRET;

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
