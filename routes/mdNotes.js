const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MdBook = require('../models/mdNote');
const MdNote = require('../models/mdNote');


router.get('/latest', (req, res, next) => {
  const id = req.session.currentUser._id;
  console.log(id);
  MdNote.find( {owner_id: id} ).sort({ updatedAt : -1 })
    .limit(6)
    .then(mdNotes => {
      return res.status(200).json(mdNotes)
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  MdNote.findById(id)
  .then(note => {
      return res.status(200).json(note)
    })
    .catch(error => {
      next(error);
    })
});

router.get('/:id/mdbook', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const id = req.params.id;
  
  MdBook.
  find({ mdNotes: mongoose.Types.ObjectId(id) })
  .then(mdBook => {
    return res.status(200).json(mdBook);
  })
  .catch(err => {
    next(err);
  })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const update = { title, content }
  
  MdNote.findByIdAndUpdate(id, update)
  .then(note => {
    return res.status(200).json(note);
  })
  .catch(error => {
    next(error);
  });
});

router.put('/:id/pin', (req, res, next) => {
  const id = req.params.id;
  const pinned = req.body.pinned;

  MdNote.findByIdAndUpdate(id, {pinned: pinned})
  .then(note => {
    return res.status(200).json(note);
  })
  .catch(error => {
    next(error);
  })
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  MdNote.findByIdAndRemove(id)
  .then(note => {
    return res.status(200).json(note);
  })
  .catch(error => {
    next(error);
  })
});
  



module.exports = router;