var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
fs = require('fs-extra');
const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const { path2 } = require('../app');
const url = 'mongodb://localhost:27017/arthubdb';
const path = require('path');
var loggedUser = "";
var successLog = false;

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + loggedUser + '-' + Date.now() + path.extname(file.originalname));
  }
});

// set upload function
const upload = multer({
  storage: storage
}).single('myImage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bohemio', success: req.session.success, errors: req.session.errors, user: req.session.user });
  req.session.errors = null;
  req.session.success = null;

  // get users from db and prints them
  MongoClient.connect(url, function(err, db){
    console.log("users");
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      console.log(doc);
    }, function(){

      db.close();
    });
  });

  MongoClient.connect(url, function(err, db){
    console.log("profiles");
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('profile').find();
    cursor.forEach(function(doc, err){
      console.log(doc);
    }, function(){
      
      db.close();
    });
  });
});

// for developer version: restart db button
router.post('/restart-db', function(req, res, next){
  MongoClient.connect(url, function(err, db){
    db.collection('user-data').drop(function(err, result){
      if(err != null){
        console.log("error dropping");
      }
      if (result){
        console.log("user-data collection dropped");
        res.redirect('/');
      }
    });
  });

});

// go to register form page
router.post('/register', function(req, res, next){

  MongoClient.connect(url, function(err, db){
    db.collection('user-data').count().then(function(count){
      if(count == 0){
        console.log("no users");
      }else{
        console.log("currently " + count + "users");
      }
      res.render('register', { title: 'Bohemio', errors: req.session.errors });
    });
  });
  req.session.errors = null;

});

// for register account button
router.post('/register/submit-account', function(req, res, next){

  var inputUsername = req.body.username;
  var inputPassword = req.body.password;
  var inputUsertype = req.body.usertype;
  var loggedUser = req.session.user;
  var userID = "";
  var objectID = null;

  // mongodb user insertion
  var item = {
    username: inputUsername,
    password: inputPassword,
    usertype: inputUsertype
  };
  MongoClient.connect(url, function(err, db){
    db.collection('user-data').count().then((count) => {
      console.log("number of users from db: " + count);
      // count users
      if(count == 0){
        console.log("no users");
      }
      else{
        console.log("has users")
      }

      // insert user to db
      db.collection('user-data').insertOne(item, function(err, result){
        userID = (result.insertedId).toString();
        objectID = result.insertedId;

        console.log('Item inserted, id:' + (result.insertedId).toString());

      });
      db.close();
    });
  });

  res.redirect('/');
});

// for login button in home page
router.post('/login', function(req, res, next){

  var loginusername = req.body.loginusername;
  var loginpassword = req.body.loginpassword;
  var exists = false;
  var userID = "";
  var objectID;

  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == loginusername && doc.password == loginpassword){
        exists = true;
        userID = (doc._id).toString();
        objectID = doc._id;
      }
    }, function(){
      db.close();

      if(exists == true){
        req.session.success = true;
        req.session.user = loginusername;
        req.session.mongoID = objectID;
        console.log("successfull validation of " + objectID);
        loggedUser = req.session.user;
        successLog = true;
        console.log("logged user: " + req.session.user);
        res.redirect('/');
      }else{
        req.session.success = false;
        req.session.user = "";
        req.session.mongoID = null;
        console.log("unsuccessfull validation");
        successLog = false;
        res.redirect('/');
      }
    });
  });



});


router.post('/uploadphoto', function(req, res, next){
  console.log("upload...");
  upload(req, res, (err) => {
    if (err){
      req.session.status = err;
      res.render('index', {user: loggedUser, status:req.session.status});
    } else {
      console.log(req.file);
      req.session.upstatus = "success";
      console.log(loggedUser);
      res.render('index', {title: 'Bohemio', success: successLog, user: loggedUser, status:req.session.upstatus});
    }
  });
  
});


module.exports = router;
