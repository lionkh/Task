var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();
var compiler = webpack(config);
var db;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err,docs)=>{
    if(err){
        console.log(err);
        return res.sendStatus(500);
      }

      res.send(docs);
  })
});

app.post('/login', (req, res) => {
  
  var user = {
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  };

  db.collection('users').findOne({login: req.body.login, password: req.body.password}, function(err, doc){
    if(err){
    return res.sendStatus(500);
    }
    if(doc == null){
      //  return res.sendStatus(500);
        res.send({'Auth':'Denied'});
    }
    
    if(doc != null){
     //return res.sendStatus(200);
     res.send({'Auth':'Logged', 'Language':'EN'});
    }
  })
});


app.post('/registrate', (req, res) => {

  var user = {
    login: req.body.login,
    password: req.body.password,
  };

  db.collection('users').insert(user, function(err, result){ //попробовать через then data=>{}
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(user); //id вставится автоматически */
 });
});


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}); 


MongoClient.connect('mongodb://localhost:27017/myDB', function(err, database){
  if(err){
    return console.log(err);
  }

  db = database;

  app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});

});


