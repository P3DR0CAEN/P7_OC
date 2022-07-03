const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    await models.Comment.create(
        {
            content: req.body.content,
            userId: req.userId,
            postId: req.body.postId,
        },
        {
            omitNull: true,
        }
    )
        .then((newPost) => {
            console.log("newComment auto-generated ID: " + newPost.id);
            return res.status(201).json({
                message: "Votre commentaire à bien été créer !",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: "Une erreur est survenue !",
            });
        });
};
