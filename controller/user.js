const {user} = require('../prisma/db');

module.exports = {
	register: async function (req, res) {
		const result = await user.create({
			data: {
				...req.body,
				role: {
					connect:{
						role: "client"
					}
				}
			}
		});
		return res.send(result);
	}
}