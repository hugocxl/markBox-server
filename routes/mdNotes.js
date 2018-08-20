const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MdBook = require('../models/mdNote');
const MdNote = require('../models/mdNote');


router.get('/latest', (req, res, next) => {
  const id = req.session.currentUser._id;
  MdNote.find( {owner_id: id} ).sort({ updatedAt : -1 })
    .limit(6)
    .then(mdNotes => {
      return res.status(200).json(mdNotes)
    })
    .catch(next);
});

router.get('/pinned', (req, res, next) => {
  const id = req.session.currentUser._id;
  MdNote.find( {owner_id: id, pinned: true} )
    // .limit(6)
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

router.post('/search', (req, res, next) => {
  const id = req.session.currentUser._id;
  const searchStr = req.body.search;
  MdNote.find({ owner_id: id , content: { "$regex": searchStr, "$options": "i" } }).sort({ updatedAt : -1 }).limit(20)
  .then(mdNotes => {
    return res.status(200).json(mdNotes)
  })
  .catch(next);
});

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

router.put('/:id/title', (req, res, next) => {
  const id = req.params.id;
  const { title } = req.body;
  MdNote.findByIdAndUpdate(id, {title})
  .then(note => {
    return res.status(200).json(note);
  })
  .catch(error => {
    next(error);
  });
});

router.put('/:id/pin', (req, res, next) => {
  const id = req.params.id;
  const pinned = req.body.status;

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