const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    await models.User.findOne({
        attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "image",
            "created_at",
        ],
        where: { id: req.userId },
    })
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch((error) => {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
