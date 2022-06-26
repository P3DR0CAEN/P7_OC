require("dotenv").config();
const { models } = require("../../sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    await models.User.findOne({
        where: { email: req.body.email },
    })
        .then((user) => {
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Mot de passe incorrect !" });
                    }
                    return res.status(200).json({
                        userId: user.dataValues.id,
                        token: jwt.sign(
                            { userId: user.dataValues.id },
                            process.env.USER_TOKEN_CONNEXION,
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => {
                    return res.status(500).json({ error });
                });
        })
        .catch((error) => {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
