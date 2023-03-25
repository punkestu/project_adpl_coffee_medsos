const express = require('express');
const userController = require("../controller/user");
const router = express.Router();

function jsonToQueryString(json) {
  return '?' +
      Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
      }).join('&');
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.register, function(req,res){
  if(req.token){
    return res.cookie("token",req.token, {maxAge: 1000*60*60}).redirect("/home");
  }
  return res.status(404).redirect('/register'+jsonToQueryString(req.errors));
});

router.post('/login', userController.login, function(req,res){
  if(req.token){
    return res.cookie("token", req.token, {maxAge: 1000*60*60}).redirect("/home");
  }
  return res.status(404).redirect('/login'+jsonToQueryString(req.errors));
});

module.exports = router;
