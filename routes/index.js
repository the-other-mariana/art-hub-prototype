var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Art Hub', subtitle: 'Art Hub Version 1.0', condition: false });
});

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
