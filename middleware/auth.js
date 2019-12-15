const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
    const token = req.cookies["auth"];

    if (!token) {
        req.errorMsg = 'Access Denied. No token provided';
        next();
    } else {
        try {
            const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
            req.user = decoded;
            next();
        } catch (ex) {
            req.errorMsg = 'Access Denied. No token provided';
            next();
        }
    }
}

module.exports = auth;