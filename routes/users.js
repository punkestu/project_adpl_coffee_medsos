const express = require('express');
const userController = require("../controller/user");
const router = express.Router();
const {jsonToQueryString} = require('../tools/tools');

const timeOut = 1000*60*60;

router.post('/register', userController.register, function(req,res){
  if(req.token){
    return res.cookie("token",req.token, {maxAge: timeOut}).redirect("/home");
  }
  return res.status(400).redirect('/register'+jsonToQueryString(req.errors));
});

router.post('/login', userController.login, function(req,res){
  if(req.token){
    return res.cookie("token", req.token, {maxAge: timeOut}).redirect("/home");
  }
  return res.status(400).redirect('/login'+jsonToQueryString(req.errors));
});

module.exports = router;
