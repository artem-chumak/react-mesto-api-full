const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorControll = require('./controllers/errorsControll');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { creatUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
});

app.use(helmet());
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/((http|https):\/\/)?(www\.)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w-]*)?(\?.*)?/),
    }),
  }),
  creatUser);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorControll);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App listining on port: >>> ${PORT} <<<`));
  } catch (error) {
    console.log('Server ERROR: >>>', error.message);
    process.exit(1);
  }
}

start();
