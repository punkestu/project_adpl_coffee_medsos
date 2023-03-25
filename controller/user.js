const {user} = require('../prisma/db');
const jwt = require('jsonwebtoken');

module.exports = {
	validateToken: async function(token){
		try {
			return await jwt.verify(token, 'this_is_secret_key');
		}catch (e){
			return null;
		}
	},
	login: async function (req,res,next){
		try{
			const User = await user.findFirst({
				where: {
					email: req.body.email
				}
			});
			req.errors = {user: '', password:''};
			if(User == null){
				req.errors.user = 'User not found';
			}else{
				if(User.password == req.body.password){
					req.token = jwt.sign(User, process.env["SECRET"], {expiresIn: 60*60});
				}else{
					req.errors.password = 'Wrong Password';
				}
			}
			return next();
		}catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	},
	register: async function (req, res, next) {
		try {
			const result = await user.create({
				data: {
					...req.body,
					role: {
						connect: {
							role: "client"
						}
					}
				}
			});
			req.token = jwt.sign(result, process.env["SECRET"], {expiresIn: 60*60});
			next();
		}catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	}
}