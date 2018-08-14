const express = require('express');
const router = express.Router();

const MdBook = require('../models/mdBook');
const MdNote = require('../models/mdNote');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  const id = req.session.currentUser.id;
  User.findById(userId).populate('mdBooks')
  .then(user => {
    return res.status(200).json(user.mdBooks)
  })
  .catch(next);
});

router.post('/new', (req, res, next) => {
  const { title } = req.body;
  console.log(title);
  const newMdBook = new MdBook({
    title
  });
  newMdBook.save()
    .then(data => {
      res.status(200);
      return res.json(data);
    })
    .catch();
});

router.post('/:id/edit', (req, res, next) => {
})

router.post('/:id/delete', (req, res, next) => {
})

router.post('/:id/new', (req, res, next) => {
})


module.exports = router;