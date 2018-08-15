'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');
const User = require('../models/user');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({code: 'not-found'});
  }
});

router.post('/login', authMiddleware.validateUserInputs, (req, res, next) => {
  
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({code: 'not-found'});
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      } else {
        return res.status(404).json({code: 'not-found'});
      }
    })
    .catch(next);
});

router.post('/signup', authMiddleware.validateUserInputs, (req, res, next) => {

  const password = req.body.password;
  const email = req.body.email;

  User.findOne({email}, 'email')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({code: 'username-not-unique'});
      }
      
      const hashPass = authMiddleware.encryptPassword;

      const newUser = User({
        password: hashPass,
        email
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.json(newUser);
        });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

router.post('/edit', (req, res) => {
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  const email = req.body.email1;
  const email2 = req.body.email2;


  return res.status(204).send();
});



module.exports = router;