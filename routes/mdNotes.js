const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const MdNote = require('../models/mdNote');

module.exports = MdNote;