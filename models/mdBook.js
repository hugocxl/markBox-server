'use strict';


const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;


const mdBookSchema = new Schema({
  title: { type: String, required: true },
  mdNotes: { type: ObjectId, ref: 'MdNotes' },
});

const MdBook = mongoose.model('MdBook', mdBookSchema);

module.exports = MdBook;