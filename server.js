const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const chalk = require('chalk');
require('dotenv').config();

const createPath = require('./helpers/create-path');

const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');

// разукрашивают сообщения в консоли
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

// process.env. скрывает приватные данные для публичных репо
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(successMsg('connected to DB')))
  .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listening port ${process.env.PORT}`));
});

// middleware  который выводит данные сразу после получения запроса
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

// миддлвар для парсинга строки запроса
app.use(express.urlencoded({ extended: false }));

// чтобы был доступ к стилям на сервере и подлючению их в html(ejs)
app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res.status(404).render(createPath('error'), { title });
});
