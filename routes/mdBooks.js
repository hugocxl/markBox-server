const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const MdBook = require('../models/mdBook');
const MdNote = require('../models/mdNote');
const User = require('../models/user');


router.get('/', (req, res, next) => {
  const userId = req.session.currentUser.id;
  
  User.findById(userId).populate('mdBooks')
  .then(user => {
    return res.status(200).json(user.mdBooks)
  })
  .catch(next);
});


router.post('/new', (req, res, next) => {
})

router.post ('/:id/edit', (req, res, next) => {
})

router.post ('/:id/delete', (req, res, next) => {
})

router.post ('/:id/new', (req, res, next) => {
})




module.exports = MdBook; 