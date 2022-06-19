const { models } = require("../sequelize");

module.exports = async (req, res, next) => {
    let imageName = null;
    if (typeof req.file !== "undefined") {
        imageName = req.file.filename;
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
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
