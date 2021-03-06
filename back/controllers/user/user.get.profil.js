const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;

    let userId = req.userId;
    if (typeof req.params.id !== "undefined") {
        userId = req.params.id;
    }

    await models.User.findOne({
        attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "image",
            "isAdmin",
            "created_at",
        ],
        where: { id: userId },
    })
        .then((user) => {
            user.toJSON();
            user["image"] = "http://" + host + "/images/users/" + user.image;
            return res.status(200).json(user);
        })
        .catch((error) => {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
