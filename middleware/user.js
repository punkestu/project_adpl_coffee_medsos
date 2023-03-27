const {validateToken} = require("../controller/user");

module.exports = {
	isAuth: async function (req, res, next) {
		console.log("cek authentication");
		if(req.cookies.token){
			req.user = await validateToken(req.cookies.token);
			next();
		}else{
			return res.render("403", {msg: "Tolong login terlebih dahulu"});
		}
	}
}