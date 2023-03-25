const express = require('express');
const router = express.Router();
const {validateToken} = require('../controller/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', async function(req,res){
  const payload = await validateToken(req.cookies.token);
  if(!payload){
    return res.send("please login");
  }
  return res.send("welcome");
});

router.get('/register', function (req, res){
  res.render('register', {errors: req.error});
});

router.get('/login', function (req,res){
  res.render('login', {errors: req.error});
});

router.get('/logout', function(req,res){
  res.cookie('token', '', {maxAge:0}).redirect('/home');
});

module.exports = router;
