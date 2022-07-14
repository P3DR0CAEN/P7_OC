require("dotenv").config();
const jwt = require("jsonwebtoken");
const { models } = require("../sequelize");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            process.env.USER_TOKEN_CONNEXION
        );
        const userId = decodedToken.userId;
        req.userId = userId;

        // verif si authUser est admin
        req.AuthIsAdmin = false;
        await models.User.findOne({
            attributes: ["isAdmin"],
            where: { id: userId },
        }).then((user) => {
            if (user.isAdmin == 1) {
                req.AuthIsAdmin = true;
            }
        });

        next();
    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
