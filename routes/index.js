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
const { type } = require('os');

// global usage variables
var loggedUser = "";
var userType = false; // false is for companies, true is for artists
var successLog = false;
var profilePic = "";
var contactInfo = {email: "none", mobile: "0"};
var searchInput = "";

// set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    var nameOnly = path.basename(file.originalname, path.extname(file.originalname));
    //cb(null, file.fieldname + '-' + loggedUser + '-' + Date.now() + path.extname(file.originalname));
    cb(null, nameOnly + '-' + loggedUser + path.extname(file.originalname));
    console.log("passed storage--");
  }
});

// set upload function
const upload = multer({
  storage: storage
}).single('myImage');

/* GET home page. */
router.get('/', function(req, res, next) {
  

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

  res.render('index', { title: 'Bohemio', success: req.session.success, errors: req.session.errors, user: req.session.user, usertype: userType});
  req.session.errors = null;
  req.session.success = null;
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
  var profPath = "myImage-default.png";
  var uemail = "email@example.com";
  var umobile = "000 000 0000";
  var loggedUser = req.session.user;
  var userID = "";
  var objectID = null;

  userType = req.body.usertype;

  // mongodb user insertion
  var item = {}
  if (inputUsertype == "artist"){
    item = {
      username: inputUsername,
      password: inputPassword,
      usertype: inputUsertype,
      profilePic: profPath,
      email: uemail,
      mobile: umobile,
      projects: []
    };
  }
  if (inputUsertype == "company"){
    item = {
      username: inputUsername,
      password: inputPassword,
      usertype: inputUsertype,
      profilePic: profPath,
      email: uemail,
      mobile: umobile,
      vacancies: []
    };
  }
  
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
        if (doc.usertype == "artist"){
          userType = true;
        }
        if (doc.usertype == "company"){
          userType = false;
        }
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

// upload button in profile pic
router.post('/uploadphoto', function(req, res, next){
  console.log("upload...");
  upload(req, res, (err) => {
    if (err){
      req.session.upstatus = err;
      res.render('index', {user: loggedUser, status:req.session.upstatus, usertype: userType});
    } else {
      console.log(req.file);
      req.session.upstatus = "success";
      console.log(loggedUser);
      

      // update mongodb

      MongoClient.connect(url, function(err, db){
        if(err != null){
          console.log("error at db connect");
        }
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err){
          if (doc.username == loggedUser){
            exists = true;
            userID = (doc._id).toString();
            objectID = doc._id;
            doc.profilePic = req.file.filename;

            myquery = {username: loggedUser};
            newvalues = {
              username: doc.username, 
              password: doc.password, 
              usertype: doc.usertype, 
              profilePic: req.file.filename,
              email: doc.email,
              mobile: doc.mobile,
              projects: doc.projects,
            };
            db.collection("user-data").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            });
          }
        }, function(){
          db.close();
        });
        
      });
      
    }
  });
  res.render('index', {title: 'Bohemio', success: successLog, user: loggedUser, status: req.session.upstatus, usertype: userType});
});

// for AJAX resource
router.get('/profpic', function(req, res, next) {
  // mongo db get data
  
  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == loggedUser){
        profilePic = doc.profilePic;
      }
    }, function(){
      db.close();
      res.send(profilePic);
      //console.log(App.userslist);
      console.log("Pic: " + profilePic);
    });
  });

});

router.post('/updateInfo', function(req, res, next){

  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == loggedUser){
        
        myquery = {username: loggedUser};
        newvalues = {
          username: doc.username, 
          password: doc.password, 
          usertype: doc.usertype, 
          profilePic: doc.profilePic, 
          email: req.body.upemail, 
          mobile: req.body.upmobile,
          projects: doc.projects
        };
        db.collection("user-data").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
      }
    }, function(){
      db.close();
    });
    
  });
  res.render('index', {title: 'Bohemio', success: successLog, user: loggedUser, status: req.session.upstatus, usertype: userType});
});

// for AJAX resource
router.get('/contactInfo', function(req, res, next) {
  // mongo db get data
  
  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == loggedUser){
        contactInfo.email = doc.email;
        contactInfo.mobile = doc.mobile;
      }
    }, function(){
      db.close();
      res.send(contactInfo);
      
    });
  });

});

router.post('/newProject', function(req, res, next){
  console.log("new project...");
  upload(req, res, (err) => {
    if (err){
      req.session.upstatus = err;
      res.render('index', {user: loggedUser, status:req.session.upstatus});
    } else {
      console.log(req.file);
      req.session.upstatus = "success";
      console.log(loggedUser);
      

      // update mongodb

      MongoClient.connect(url, function(err, db){
        if(err != null){
          console.log("error at db connect");
        }
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err){
          if (doc.username == loggedUser){
            newProj = {
              title: req.body.projName, 
              description: req.body.projDescrip,
              type: req.body.projType,
              media: req.file.filename
            };

            var cprojects = doc.projects
            cprojects.push(newProj);

            myquery = {username: loggedUser};
            newvalues = {
              username: doc.username, 
              password: doc.password, 
              usertype: doc.usertype, 
              profilePic: doc.profilePic,
              email: doc.email,
              mobile: doc.mobile,
              projects: cprojects,
            };
            db.collection("user-data").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            });
          }
        }, function(){
          db.close();
        });
        
      });
      
    }
  });
  res.render('index', {title: 'Bohemio', success: successLog, user: loggedUser, status: req.session.upstatus, usertype: userType});
});

// for AJAX resource
router.get('/itemsInfo', function(req, res, next) {
  // mongo db get data
  var citems = [];

  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == loggedUser && userType == true){
        citems = doc.projects;
        citems.push(userType);
      }
      if (doc.username == loggedUser && userType == false){
        citems = doc.vacancies;
        citems.push(userType);
      }
    }, function(){
      db.close();
      res.send(citems);
      
    });
  });

});

router.post('/editProject', function(req, res, next){
  console.log("editing project...");
  upload(req, res, (err) => {
    if (err){
      req.session.upstatus = err;
      res.render('index', {user: loggedUser, status:req.session.upstatus});
    } else {
      console.log(req.file);
      req.session.upstatus = "success";
      console.log(loggedUser);
      

      // update mongodb

      MongoClient.connect(url, function(err, db){
        if(err != null){
          console.log("error at db connect");
        }
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err){
          if (doc.username == loggedUser){
            console.log(typeof req.body.projID);
            var index = parseInt(req.body.projID);
            newProj = {
              title: req.body.projName, 
              description: req.body.projDescrip,
              type: req.body.projType,
              media: req.file.filename
            };

            var cprojects = doc.projects
            //cprojects.push(newProj);
            cprojects[index] = newProj;

            myquery = {username: loggedUser};
            newvalues = {
              username: doc.username, 
              password: doc.password, 
              usertype: doc.usertype, 
              profilePic: doc.profilePic,
              email: doc.email,
              mobile: doc.mobile,
              projects: cprojects,
            };
            db.collection("user-data").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            });
          }
        }, function(){
          db.close();
        });
        
      });
      
    }
  });
  res.render('index', {title: 'Bohemio', success: successLog, user: loggedUser, status: req.session.upstatus, usertype: userType});
});

router.post('/search', function(req, res, next){

  searchInput = req.body.searchinput;
  res.render('search', { title: 'Bohemio', errors: req.session.errors, success: successLog, user: loggedUser, usertype: userType, searchinput: searchInput});
  req.session.errors = null;

});

// for AJAX resource
router.get('/loadSearchResults', function(req, res, next) {
  // mongo db get data
  var cresults = [];

  MongoClient.connect(url, function(err, db){
    if(err != null){
      console.log("error at db connect");
    }
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err){
      if (doc.username == searchInput){
        rusername = doc.username;
        rpic = doc.profilePic;
        remail = doc.email;
        rmobile = doc.mobile;

        cresults.push({ username: rusername, profilePic: rpic, email: remail, mobile: rmobile});
      }
    }, function(){
      db.close();
      res.send(cresults);
      
    });
  });

});

module.exports = router;
