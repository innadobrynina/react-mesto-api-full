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

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.locals.jwtKey = 'secret-key';

app.use(cookieParser());
app.use(errors());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/signin', validateEmailAndPassword, login);
app.post('/signup', validateRegistration, createUser);

app.use(auth);

app.use('/', usersRoutes);

app.use('/', cardsRoutes);

app.use('/', noSuchPageRouter);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
