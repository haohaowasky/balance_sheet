const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://test:test@ds149724.mlab.com:49724/balance');
mongoose.Promise = global.Promise;
// set up express app
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(routes);
// listen for requests

app.use(function(err,req,res,next){
  res.status(422).send({error:err.message})
});

app.listen(process.env.port || 4000, function(){
  console.log("now listen");
});
