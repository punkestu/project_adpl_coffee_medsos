const {kedaiProfile} = require('../prisma/db');

module.exports = {
	getKedai: async function (req, res, next) {
		try {
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
			next();
		} catch (e) {
			console.log(e);
			return res.sendStatus(400);
		}
	},
	create: async function (req, res, next) {
		try {
			const result = await kedaiProfile.create({
				data: {
					user: {
						connect: {
							Id: req.user.Id
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
	},
	update: async function (req,res,next) {
		try{
			const result = await kedaiProfile.update({
				where: {
					Id: req.user.Id
				},
				data: {
					description: req.body.deskripsi,
					KedaiAlamat: {
						update: {
							jalan: req.body.jalan,
							kecamatan: req.body.kecamatan,
							kota: req.body.kota
						}
					}
				}
			});
			console.log(result);
			next();
		}catch (e) {
			console.log(e);
			return res.render("500");
		}
	}
};