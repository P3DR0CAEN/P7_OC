require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            process.env.USER_TOKEN_CONNEXION
        );
        console.log(decodedToken);
        const userId = decodedToken.userId;
        req.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
