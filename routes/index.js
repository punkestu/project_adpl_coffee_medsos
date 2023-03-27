const express = require('express');
const router = express.Router();
const {validateToken} = require('../controller/user');
const midKedai = require("../middleware/kedai");
const {isNotAuth} = require("../middleware/user");

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

router.get('/register', isNotAuth, async function (req, res){
  if(req.query.context){
    const context = await validateToken(req.query.context);
    return res.render('register', {errors: context.errors, data: context.data});
  }
  return res.render('register');
});

router.get('/login', isNotAuth, async function (req,res){
  if(req.query.context){
    const context = await validateToken(req.query.context);
    return res.render('login', {errors: context.errors, data: context.data});
  }
  return res.render('login');
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
