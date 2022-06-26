const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    let userId = req.userId;
    if (req.params.id !== "undefined") {
        console.log("id : " + req.params.id);
        userId = req.params.id;
    }

    await models.User.findOne({
        attributes: [
            "id",
            "firstname",
            "lastname",
            "email",
            "image",
            "created_at",
        ],
        where: { id: userId },
        include: [
            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
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
                order: "created_at DESC",
            },

            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
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
                order: "created_at DESC",
            },

            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
                as: "likedPosts",
            },
        ],
    })
        .then((user) => {
            mergePosts = user.Posts.concat(user.sharedPosts).sort(
                (a) => new Date(a.created_at)
            );

            let data = user.toJSON();
            data["allPosts"] = mergePosts.reverse();

            return res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
