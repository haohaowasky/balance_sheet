const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const updateSchema = new Schema({

  updateIndex: {
    type: Number,
    required: [true, 'Index is required!']
  },

  payment:{
    type: Number,
  },

  memo:{
    type: String
  },

  privatekey:{
    type: String,
    required: [true, 'privatekey is required!']
  }

});


const Update = mongoose.model("update",updateSchema);


module.exports = Update;
