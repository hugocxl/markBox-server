'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');
const User = require('../models/user');

router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    const { _id } = req.session.currentUser;
    User.findById(_id)
    .then(user => {
      res.json(user);
    })
  } else {
    res.status(404).json({code: 'not-found'});
  }
});

router.put('/settings', (req, res, next) => {
  const { settings } = req.body.settings;
  const { _id } = req.session.currentUser;
  User.findByIdAndUpdate(_id, settings,  {new: true})
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    next(error);
  })
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
        console.log(req.session.currentUser)
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
      
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

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

router.put('/edit', (req, res, next) => {
  const { _id } = req.session.currentUser
  
  if(req.body.email){
    const email = req.body.email;
    User.findByIdAndUpdate(_id, {email: email}, {new: true})
    .then(user => {
      req.session.currentUser = user
      res.status(200).json(user);
    })
    .catch(error => {
      next(error);
    });
  };
  
  if(req.body.password){
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    
    User.findByIdAndUpdate(_id, {password: hashPass}, {new: true})
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      next(error);
    });
  };
  
  if(req.body.settings){
    const settings  = req.body.settings
    
    User.findByIdAndUpdate(_id, {settings}, {new: true})
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      next(error);
    });
  };

});




module.exports = router;