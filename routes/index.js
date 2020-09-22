var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
  req.session.success = null;
});

router.post('/submit', function(req, res, next){
  //check validity with validator pckg function
  req.check('email', 'invalid email address').isEmail(); // email has to match name
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  }else{
    req.session.success = true;
    var test = req.body.email;
    console.log("email is: " + test);
  }
  // following action: this will call 1.
  res.redirect('/');

});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
