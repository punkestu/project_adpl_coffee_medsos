const express = require('express');
const kedaiController = require("../controller/kedai");
const router = express.Router();
const midKedai = require("../middleware/kedai");

router.get('/p/:user', kedaiController.getKedai, function(req,res){
	if(req.kedai){
		return res.render('kedai_profile', {kedai: req.kedai});
	}
	return res.send("kedai tidak ada");
});

router.post('/profile', midKedai.update, kedaiController.update, function (req,res){
	if(!req.errors){
		return res.redirect('/home');
	}
	return res.status(400).redirect('/home');
});

router.post('/', midKedai.create, kedaiController.create, function (req,res){
	if(!req.errors){
		return res.redirect('/home');
	}
	return res.status(400).redirect('/home');
});

module.exports = router;