const express = require('express');
const router = express.Router();
const createPath = require('../helpers/create-path');

const Contact = require('../models/contact');

router.get('/contacts', (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error', { title: 'Error' }));
    });
});

module.exports = router;
