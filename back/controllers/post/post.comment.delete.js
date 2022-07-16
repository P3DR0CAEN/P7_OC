const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    var whereStatement = {};
    whereStatement.id = req.params.id;

    if (!req.AuthIsAdmin) {
        whereStatement.userId = req.userId;
    }

    try {
        const comment = await models.Comment.findOne({
            where: whereStatement,
        });
        await comment.destroy();
        return res.status(201).json({
            message: "Commentaire supprimé !",
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Commentaire non trouvé !" });
    }
};
