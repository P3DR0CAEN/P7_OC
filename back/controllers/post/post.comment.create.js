const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    if (req.body.content == "") {
        req.body.content = null;
    }

    await models.Comment.create({
        content: req.body.content,
        userId: req.userId,
        postId: req.body.postId,
    })
        .then((newPost) => {
            console.log("newComment auto-generated ID: " + newPost.id);
            return res.status(201).json({
                message: "Votre commentaire à bien été créer !",
            });
        })
        .catch((error) => {
            if (
                typeof error.errors !== "undefined" &&
                error.errors[0].type == "notNull Violation"
            ) {
                return res.status(500).json({
                    error: "Le contenu ne peut pas être vide !",
                });
            }

            return res.status(500).json({
                error: "Une erreur est survenue !",
            });
        });
};
