const {validateToken} = require("../controller/user");
const {body} = require("express-validator");
const {user} = require("../prisma/db");

module.exports = {
	isAuth: async function (req, res, next) {
		console.log("cek authentication");
		if (req.cookies.token) {
			req.user = await validateToken(req.cookies.token);
			next();
		} else {
			return res.render("403", {msg: "Tolong login terlebih dahulu"});
		}
	},
	isNotAuth: async function (req, res, next) {
		if (req.cookies.token) {
			req.user = await validateToken(req.cookies.token);
			if (req.user) {
				return res.redirect("/home");
			}
		}
		next();
	},
	login: [
		body("email").custom(async (email, {req}) => {
			const User = await user.findFirst({
				where: {
					email
				}
			});
			if (!User) {
				throw new Error("Email tidak terdaftar");
			}
			req.user = User;

			return true;
		}).notEmpty().withMessage("Email tidak boleh kosong"),
		body("password").custom((password, {req})=>{
			if(req.user && req.user.password != password){
				throw new Error("Password salah");
			}

			return true;
		})
	],
	register: [
		body("email").custom(async (email) => {
			const User = await user.findFirst({
				where: {
					email
				}
			});
			if (User) {
				throw new Error("Email sudah dipakai");
			}

			return true;
		}).notEmpty().withMessage("Email tidak boleh kosong"),
		body("username").custom(async (username) => {
			const User = await user.findFirst({
				where: {
					username
				}
			});
			if (User) {
				throw new Error("Username sudah dipakai");
			}

			return true;
		}).notEmpty().withMessage("Username tidak boleh kosong"),
		body("password")
			.isLength({min: 8}).withMessage("Password minimal 8 karakter")
			.notEmpty().withMessage("Password tidak boleh kosong")
	]
}