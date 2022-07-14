const { models } = require("../../sequelize");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
    if (req.body.firstName == "") {
        req.body.firstName = null;
    }
    if (req.body.lastName == "") {
        req.body.lastName = null;
    }
    if (req.body.email == "") {
        req.body.email = null;
    }

    const format_email = /\S+@\S+\.\S+/;
    if (!format_email.test(req.body.email)) {
        return res.status(500).json({
            error: "Veuillez entrer une adresse email valide.",
        });
    }

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
                        let ErrorNameFr = null;
                        if (error.errors[0].path == "firstName") {
                            ErrorNameFr = "Prénom";
                        }
                        if (error.errors[0].path == "lastName") {
                            ErrorNameFr = "Nom";
                        }
                        return res.status(500).json({
                            error:
                                "Le champ " +
                                ErrorNameFr +
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
