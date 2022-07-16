const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    let imageName = null;
    if (typeof req.file !== "undefined") {
        imageName = req.file.filename;
    }

    const format_email = /\S+@\S+\.\S+/;
    if (!format_email.test(req.body.email)) {
        return res.status(500).json({
            error: "Veuillez entrer une adresse email valide.",
        });
    }

    await models.User.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            image: imageName,
        },
        {
            where: {
                id: req.userId,
            },
            omitNull: true,
        }
    )
        .then((user) => {
            return res.status(200).json({ message: "Profil mis à jour !" });
        })
        .catch((error) => {
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
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
