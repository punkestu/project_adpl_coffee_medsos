const { user } = require("../prisma/db");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

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
        req.errors = validationResult(req);
        if(req.errors){
            const context = tools.signToken({data: req.body, errors: req.errors.mapped()});
            return res.redirect("/login?context="+context);
        }
        try {
            req.token = tools.signToken(req.user);
            next();
        } catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    },
    register: async function (req, res, next) {
        req.errors = validationResult(req);
        if(req.errors){
            const context = tools.signToken({data: req.body, errors: req.errors.mapped()});
            return res.redirect("/register?context="+context);
        }
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
