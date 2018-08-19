const express = require('express');
const router = express.Router();

const MdNote = require('../models/mdNote');
const MdBook = require('../models/mdBook');
const User = require('../models/user');

// GET ALL MD-BOOKS FROM LOGGED IN USER
router.get('/', (req, res, next) => {
  const id = req.session.currentUser._id;

  MdBook.find( {owner_id: id} ).populate({
    path: 'mdNotes',
    model: 'MdNote'
  })
  .then(books => {
    return res.status(200).json(books)
  })
  .catch(next);
});

// GET ONE MD-BOOK WITH ALL NOTES
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  MdBook.findById( id ).populate({
    path: 'mdNotes',
    model: 'MdNote'
  })
  .then(book => {
    return res.status(200).json(book)
  })
  .catch(next);
});

//ADD NEW MD-BOOK WITH EMPTY MD-NOTE
router.post('/new', (req, res, next) => {
  const { title } = req.body;
  const owner_id = req.session.currentUser._id;
  const newMdNote = new MdNote({
    title: 'New note',
    pinned: false
  });
  const newMdBook = new MdBook({
    owner_id,
    title,
  });

  newMdNote.save()
  .then(mdNote => {
    newMdBook.mdNotes.push([mdNote.id]);
    return newMdBook.save()
  })
  .then(newBook => {
    return res.status(200).json(newBook);
  })
  .catch(error => {
    next(error);
  });

});

//EDIT MD-BOOK TITLE
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title } = req.body;
  MdBook.findByIdAndUpdate(id, { title })
  .then(data => {
    return res.status(200).json(data)
  })
  .catch(error => {
    next(error);
  });
});

//DELETE MD-BOOK
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

//ADD NEW MD-NOTE AND PUSH ID TO MD-BOOK COLLECTION
router.post('/:id/new', (req, res, next) => {
  const id = req.params.id;
  const owner_id = req.session.currentUser._id;
  const { title, content } = req.body;
  const pinned = false;
  
  const newMdNote = new MdNote({
    title,
    content,
    owner_id,
    pinned
  });
  newMdNote.save()
  .then(mdNote =>{
    MdBook.findByIdAndUpdate(id, { $push: { mdNotes: newMdNote } })
      .then(book => {
        return res.status(200).json(mdNote);
    })
  })
  .catch(error => {
    next(error);
  });
});




// router.get('/latest', (req, res, next) => {
//   const id = req.session.currentUser._id;

//   MdBook.find( {owner_id: id} ).populate({
//     path: 'mdNotes',
//     model: 'MdNote'
//   }).sort({"mdNotes.updatedAt" : -1}).limit(4)
//   .then(books => {
//     return res.status(200).json(books)
//   })
//   .catch(next);
// });

// router.get('/:id/mdbook', (req, res, next) => {
//   const userId = req.session.currentUser._id;
//   const id = req.params.id;
//   MdBook.
//   find({ mdNotes: mongoose.Types.ObjectId("5b7897317e7bd91c9e0cc6b7") })
//   .then(mdBook => {
//     return res.status(200).json(mdBook);
//   })
//   .catch(err => {
//     next(err);
//   })
// })



module.exports = router;

