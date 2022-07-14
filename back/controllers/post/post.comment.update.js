const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    await models.Comment.update(
        {
            content: req.body.content,
        },
        {
            where: {
                id: req.body.commentId,
                userId: req.userId,
            },
            omitNull: true,
        }
    )
        .then((response) => {
            return res.status(201).json({
                message: "Votre commentaire à bien été modifié !",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: "Une erreur est survenue !",
            });
        });
};
