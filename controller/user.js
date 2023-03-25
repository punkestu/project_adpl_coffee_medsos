const { user } = require("../prisma/db");
const jwt = require("jsonwebtoken");

const tools = {
    validateToken: async function (token) {
        try {
            return jwt.verify(token, process.env["SECRET"]);
        } catch (e) {
            return null;
        }
    },
    signToken: function (payload) {
        return jwt.sign(payload, process.env["SECRET"], { expiresIn: 60 * 60 });
    },
};

module.exports = {
    validateToken: tools.validateToken,
    login: async function (req, res, next) {
        try {
            const User = await user.findFirst({
                where: {
                  email: req.body.email,
                },
            });
            req.errors = { user: "", password: "" };
            if (User == null) {
                req.errors.user = "User not found";
            } else {
                if (User.password == req.body.password) {
                  req.token = tools.signToken(User);
                } else {
                  req.errors.password = "Wrong Password";
                }
            }
            return next();
        } catch (e) {
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
                            role: "client",
                        },
                    },
                },
            });
            req.token = tools.signToken(result);
            next();
        } catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    },
};
