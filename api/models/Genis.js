const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create Schema
const genischema = new Schema({

  memo: {
    type: String,
    required: [true, 'memo is required!']
  },

  payment:{
    type: Number,
    required: [true, 'number is required!']
  },

  privatekey:{
    type: String,
    required: [true, 'privatekey is required!']
  }

});



const Genis = mongoose.model("genis",genischema);

module.exports = Genis
