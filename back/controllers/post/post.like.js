const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const likedPost = await models.liked_posts.findOne({
        where: {
            userId: req.userId,
            postId: req.params.id,
        },
    });

    if (!likedPost) {
        await models.liked_posts
            .create({
                userId: req.userId,
                postId: req.params.id,
            })
            .then(() => {
                return res.status(201).json({
                    message: "Post liké !",
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: "Une erreur est survenue !",
                });
            });
    } else {
        await likedPost
            .destroy()
            .then(() => {
                return res.status(201).json({
                    message: "Like retiré !",
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: "Une erreur est survenue !",
                });
            });
    }
};
