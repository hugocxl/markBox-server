const express = require('express');
const router = express.Router();

const MdBook = require('../models/mdBook');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  const { id } = req.session.currentUser.id;
  User.findById(id).populate('mdBooks')
  .then(user => {
    return res.status(200).json(user.mdBooks)
  })
  .catch(next);
});

router.post('/new', (req, res, next) => {
  const { title } = req.body;
  const newMdBook = new MdBook({
    title
  });
  newMdBook.save()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params.id;
  const { title } = req.body;
  MdBook.findByIdAndUpdate(id, title)
  .then(data => {
    return res.status(200).json(data)
  })
  .catch(error => {
    next(error);
  });
});

router.delete('/:id', (req, res, next) => {
  const {id} = req.params.id; 
  MdBook.findByIdAndRemove(id)
  .then(book => {
    return res.status(200).json(book)
  })
  .catch(error => {
    next(error);
  });
})


module.exports = router;

