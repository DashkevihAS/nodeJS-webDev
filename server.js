const express = require('express');
const path = require('path');
var morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

// middleware  который выводит данные сразу после получения запроса
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

// чтобы был доступ к стилям на сервере и подлючению их в html(ejs)
app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
    { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
    { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});
app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  res.render(createPath('post'), { title });
});
app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('posts'), { title });
});
app.get('/add-post', (req, res) => {
  const title = 'Add post';

  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'Error';
  res.status(404).render(createPath('error'), { title });
});
