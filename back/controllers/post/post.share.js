const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    const sharedPost = await models.shared_posts.findOne({
        where: {
            userId: req.userId,
            postId: req.params.id,
        },
    });

    if (!sharedPost) {
        await models.shared_posts
            .create({
                userId: req.userId,
                postId: req.params.id,
            })
            .then(() => {
                return res.status(201).json({
                    message: "Post partagé !",
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: "Une erreur est survenue !",
                });
            });
    } else {
        await sharedPost
            .destroy()
            .then(() => {
                return res.status(201).json({
                    message: "Partage retiré !",
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
