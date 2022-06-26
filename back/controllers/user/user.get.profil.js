const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    let userId = req.userId;
    if (req.params.id !== "undefined") {
        console.log("id : " + req.params.id);
        userId = req.params.id;
    }

    await models.User.findOne({
        attributes: ["firstname", "lastname", "email", "image", "created_at"],
        where: { id: userId },
        include: [
            {
                model: models.Post,
                attributes: ["content", "image", "created_at"],
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
                ],
                order: [["updatedAt", "DESC"]],
            },

            {
                model: models.Post,
                as: "sharedPosts",
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
                ],
                order: [["updatedAt", "DESC"]],
            },
        ],
    })
        .then((user) => {
            console.log(user);
            return res.status(200).json(user);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
