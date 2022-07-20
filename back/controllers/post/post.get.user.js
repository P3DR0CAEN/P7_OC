const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;

    let userId = req.userId;
    if (typeof req.params.id !== "undefined") {
        userId = req.params.id;
    }

    const includePostData = () => [
        {
            model: models.User,
            attributes: ["id", "firstname", "lastname", "image"],
        },
        {
            model: models.User,
            attributes: ["id", "firstname", "lastname"],
            as: "likedBy",
        },
        {
            model: models.Comment,
            attributes: ["id", "content", "created_at"],
            order: "created_at ASC",
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
    ];

    await models.User.findOne({
        where: { id: userId },
        include: [
            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
                include: includePostData(),
                order: "created_at DESC",
            },

            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
                as: "sharedPosts",
                include: includePostData(),
                order: "created_at DESC",
            },

            {
                model: models.Post,
                attributes: ["id", "content", "image", "created_at"],
                as: "likedPosts",
                include: includePostData(),
                order: "created_at DESC",
            },
        ],
    })
        .then((user) => {
            //merge les posts publié avec ceux partagés
            mergePosts = user.Posts.concat(user.sharedPosts);

            //rename post images path
            mergePosts.forEach((post) => {
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
                // if shared post : get date of share
                post.dataValues["sortedDate"] = post.created_at;
                if (typeof post.shared_posts !== "undefined") {
                    post.dataValues["sortedDate"] =
                        post.shared_posts.created_at;
                }
            });

            mergePosts.sort(function (a, b) {
                return (
                    new Date(b.dataValues.sortedDate).getTime() -
                    new Date(a.dataValues.sortedDate).getTime()
                );
            });

            // pareil avec les liked posts
            user.likedPosts.forEach((post) => {
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
                post.dataValues["sortedDate"] = post.created_at;
                if (typeof post.liked_posts !== "undefined") {
                    post.dataValues["sortedDate"] = post.liked_posts.created_at;
                }
            });

            user.likedPosts.sort(function (a, b) {
                return (
                    new Date(b.dataValues.sortedDate).getTime() -
                    new Date(a.dataValues.sortedDate).getTime()
                );
            });

            const data = {
                All: mergePosts,
                Liked: user.likedPosts,
            };

            return res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        });
};
