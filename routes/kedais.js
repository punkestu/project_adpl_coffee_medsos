const express = require('express');
const kedaiController = require("../controller/kedai");
const router = express.Router();

router.get('/create', function (req,res){
	return res.render('kedai_create', {errors: req.params});
});

router.get('/k/:user', kedaiController.getKedai, function(req,res){
	if(req.kedai){
		return res.render('kedai_profile', {kedai: req.kedai});
	}
	return res.send("kedai tidak ada");
});

router.post('/create', kedaiController.create, function (req,res){
	if(!req.errors){
		return res.redirect('/home');
	}
	return res.status(400).redirect('/home');
});

module.exports = router;