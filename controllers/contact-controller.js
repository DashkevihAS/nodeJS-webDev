const createPath = require('../helpers/create-path');

const Contact = require('../models/contact');

const getContact = (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error', { title: 'Error' }));
    });
};

module.exports = { getContact };
