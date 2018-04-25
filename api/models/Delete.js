const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// delete schema
const deleteSchema = new Schema({

  deleteIndex: {
    type: Number,
    required: [true, 'index is required!']
  },

  privatekey:{
    type: String,
    required: [true, 'privatekey is required!']
  }

});

const Delete = mongoose.model("delete",deleteSchema);


module.exports = Delete;
