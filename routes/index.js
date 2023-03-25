const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res){
  res.render('register', {errors: req.error});
})

module.exports = router;
