const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;

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
            const data = user.toJSON();

            //rename user image path
            data["image"] = "http://" + host + "/images/users/" + user.image;

            //merge les posts publié avec ceux partagés
            mergePosts = user.Posts.concat(user.sharedPosts).sort(function (
                a,
                b
            ) {
                return new Date(b.created_at) - new Date(a.created_at);
            });

            //rename post images path
            mergePosts.forEach((post) => {
                post.User["image"] =
                    "http://" + host + "/images/users/" + post.User.image;

                post["image"] =
                    "http://" + host + "/images/posts/" + post.image;

                console.log(post);
            });

            data["allPosts"] = mergePosts;

            return res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
