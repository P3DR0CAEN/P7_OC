const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    await models.Post.findAll({
        order: [["created_at", "DESC"]],
        include: [
            {
                model: models.User,
                attributes: [
                    "id",
                    "firstname",
                    "lastname",
                    "email",
                    "image",
                    "created_at",
                ],
            },

            {
                model: models.User,
                attributes: ["id", "firstname", "lastname"],
                as: "sharedBy",
            },
            {
                model: models.User,
                attributes: ["id", "firstname", "lastname"],
                as: "likedBy",
            },
        ],
    })
        .then(async (posts) => {
            return res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "posts non trouvé !" });
        });
};
