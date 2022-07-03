const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;

    await models.Post.findAll({
        attributes: ["id", "content", "image", "created_at"],
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
                as: "likedBy",
            },
            {
                model: models.Comment,
                attributes: ["id", "content", "image"],
                include: {
                    model: models.User,
                    attributes: ["id", "firstname", "lastname", "image"],
                },
            },
            {
                model: models.User,
                attributes: ["id", "firstname", "lastname"],
                as: "sharedBy",
            },
        ],
    })
        .then((posts) => {
            posts.forEach((post) => {
                post.toJSON();
                post.User["image"] =
                    "http://" + host + "/images/users/" + post.User.image;

                if (post.image) {
                    post["image"] =
                        "http://" + host + "/images/posts/" + post.image;
                }

                post.Comments.forEach((comment) => {
                    comment.User["image"] =
                        "http://" +
                        host +
                        "/images/users/" +
                        comment.User.image;
                });
            });

            return res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "posts non trouvé !" });
        });
};
