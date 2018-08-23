const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MdBook = require('../models/mdBook');
const MdNote = require('../models/mdNote');


router.get('/latest', (req, res, next) => {
  const id = req.session.currentUser._id;
  const idArr = [];
  MdNote.find( {owner_id: id} ).sort({ updatedAt : -1 })
    .limit(3)
    .then(mdNotes => {
      mdNotes.forEach(mdNote => {
        idArr.push(mdNote.id);
      });
      MdBook.find({ mdNotes: { $in: idArr } }).populate({
        path: 'mdNotes',
        model: 'MdNote'
      })
      .then(mdBooks => {
        mdBooks.forEach((book) => {
          arr = book.mdNotes.filter((note) => {
            return idArr.indexOf(note._id.toString()) > -1;
          })
          book.mdNotes = arr;
        });
        return res.status(200).json(mdBooks);
      })
    })
    .catch(next);
});

router.post('/search', (req, res, next) => {
  const id = req.session.currentUser._id;
  const searchStr = req.body.search;
  idArr = [];
  MdNote.find({ owner_id: id , content: { "$regex": searchStr, "$options": "i" } }).sort({ updatedAt : -1 }).limit(20)
  .then(mdNotes => {
    mdNotes.forEach(mdNote => {
      idArr.push(mdNote.id);
    });
    MdBook.find({ mdNotes: { $in: idArr } }).populate({
      path: 'mdNotes',
      model: 'MdNote'
    })
    .then(mdBooks => {
      mdBooks.forEach((book) => {
        arr = book.mdNotes.filter((note) => {
          return idArr.indexOf(note._id.toString()) > -1;
        })
        book.mdNotes = arr;
      });
      return res.status(200).json(mdBooks);
    })
  })
  .catch(next);
});

router.get('/pinned', (req, res, next) => {
  const id = req.session.currentUser._id;
  MdNote.find( {owner_id: id, pinned: true} )
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