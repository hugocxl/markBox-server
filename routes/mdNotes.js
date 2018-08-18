const express = require('express');
const router = express.Router();

const MdNote = require('../models/mdNote');


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