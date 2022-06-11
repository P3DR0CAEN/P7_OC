require("dotenv").config();
const bcrypt = require("bcrypt");
const { models } = require("../sequelize");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    /* console.log(req.body); */

    if (req.body.password == undefined || req.body.password == null) {
        return res.status(500).json({
            error: "Le champ mot de passe ne peut être vide !",
        });
    }

    bcrypt
        .hash(req.body.password, 10)
        .then(async (hash) => {
            // Create a new user
            const newUser = await models.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            })
                .then((newUser) => {
                    console.log("newUser auto-generated ID: " + newUser.id);
                    return res.status(201).json({
                        message: "Votre compte à bien été créer !",
                    });
                })
                .catch((error) => {
                    if (
                        typeof error.parent !== "undefined" &&
                        error.parent.errno == "1062"
                    ) {
                        return res.status(500).json({
                            error: "l'email saisi est déjà utilisé !",
                        });
                    }

                    if (
                        typeof error.errors !== "undefined" &&
                        error.errors[0].type == "notNull Violation"
                    ) {
                        return res.status(500).json({
                            error:
                                "Le champ " +
                                error.errors[0].path +
                                " ne peut pas être vide !",
                        });
                    }

                    return res.status(500).json({
                        error: "Une erreur est survenue !",
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
        });
};

exports.login = async (req, res, next) => {
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
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
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
