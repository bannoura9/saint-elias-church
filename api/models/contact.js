const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model('contactus', Contact);