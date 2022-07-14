const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    var whereStatement = {};
    whereStatement.id = req.params.id;

    if (!req.AuthIsAdmin == true) {
        whereStatement.userId = req.userId;
    }

    await models.Comment.update(
        {
            content: req.body.content,
        },
        {
            where: whereStatement,
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
