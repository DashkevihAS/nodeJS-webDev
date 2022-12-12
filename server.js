const express = require('express');
var morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const createPath = require('./helpers/create-path');

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

// подключаем Mongo - добавляем в строку логин пороль и название базы данных
const db =
  'mongodb+srv://DashkevichAS:Citroenc5@cluster0.nffmidu.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
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
app.use(contactRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res.status(404).render(createPath('error'), { title });
});
