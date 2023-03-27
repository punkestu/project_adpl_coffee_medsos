const express = require('express');
const router = express.Router();
const {validateToken} = require('../controller/user');
const midKedai = require("../middleware/kedai");

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

router.get('/buatkedai', midKedai.create, function (req,res){
  return res.render('kedai_form', {errors: req.params, method: "create"});
});

router.get('/ubahkedai', midKedai.update, function(req,res){
  return res.render('kedai_form', {errors: req.params, kedai: req.kedai, method: "update"});
});

module.exports = router;
