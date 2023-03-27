const {isAuth} = require("./user");
const {kedaiProfile} = require("../prisma/db");

module.exports = {
	create: [
		isAuth,
		async function (req, res, next) { // cek kedai not exist
			try {
				const kedai = await kedaiProfile.findFirst({
					where: {
						user: {
							username: req.user.username
						}
					},
					include: {
						user: true
					}
				});
				if (kedai == null) {
					next();
				} else {
					return res.send("Tidak bisa membuat lebih dari 1 kedai");
				}
			} catch (e) {
				console.log(e);
				return res.render("400");
			}
		}
	],
	update: [
		isAuth,
		async function(req,res,next){ // cek kedai exist
			try {
				const kedai = await kedaiProfile.findFirst({
					where: {
						user: {
							username: req.user.username
						}
					},
					include: {
						user: true,
						KedaiAlamat: true
					}
				});
				if (kedai != null) {
					req.kedai = kedai;
					next();
				} else {
					return res.send("Tidak bisa membuat lebih dari 1 kedai");
				}
			} catch (e) {
				console.log(e);
				return res.render("400");
			}
		}
	]
};