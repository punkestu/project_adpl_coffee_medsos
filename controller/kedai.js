const {kedaiProfile} = require('../prisma/db');
const {validateToken} = require('./user');

module.exports = {
	getKedai: async function (req, res, next) {
		try {
			// const User = await validateToken(req.cookies.token);
			// if(User){
			const kedai = await kedaiProfile.findFirst({
				where: {
					user: {
						username: req.params.user
					}
				},
				include: {
					user: {
						select: {
							username: true
						}
					},
					KedaiAlamat: true
				}
			});
			req.kedai = kedai;
			// }
			next();
		} catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	},
	create: async function (req, res, next) {
		try {
			const User = await validateToken(req.cookies.token);
			const result = await kedaiProfile.create({
				data: {
					user: {
						connect: {
							Id: User.Id
						}
					},
					description: req.body.deskripsi,
					KedaiAlamat: {
						create: {
							jalan: req.body.jalan,
							kecamatan: req.body.kecamatan,
							kota: req.body.kota
						}
					}
				}
			});
			console.log(result);
			next();
		} catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	}
};