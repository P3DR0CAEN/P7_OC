const { models } = require("../sequelize");

module.exports = async (req, res, next) => {
    await models.User.findByPk(req.userId)
        .then((user) => {
            const data = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                created_at: user.created_at,
            };
            return res.status(200).json(data);
        })
        .catch((error) => {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
