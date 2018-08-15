const express = require('express');
const router = express.Router();

const MdNote = require('../models/mdNote');
const MdBook = require('../models/mdBook');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  const id = req.session.currentUser.id;

  MdBook.find( {owner_id: id} ).populate({
    path: 'mdNotes',
    model: 'MdNote'
  })
  .then(books => {
    return res.status(200).json(books)
  })
  .catch(next);
});

router.post('/new', (req, res, next) => {
  const { title } = req.body;
  const owner_id = req.session.currentUser.id;
  const newMdBook = new MdBook({
    owner_id,
    title,
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
  const id = req.params.id;
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
  const id = req.params.id; 
  MdBook.findByIdAndRemove(id)
  .then(book => {
    return res.status(200).json(book)
  })
  .catch(error => {
    next(error);
  });
})

router.post('/:id/new', (req, res, next) => {
  const id = req.params.id;
  const { title, content } = req.body;
  
  const newMdNote = new MdNote({
    title,
    content
  });
  newMdNote.save()
    .then(mdNote =>{
      MdBook.findByIdAndUpdate(id, { $push: { mdNotes: newMdNote } })
        .then(book => {
          return res.status(200).json(book);
        })
    })
  .catch(error => {
    next(error);
  });
});



module.exports = router;

