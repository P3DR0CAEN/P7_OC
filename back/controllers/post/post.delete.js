const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    var whereStatement = {};
    whereStatement.id = req.params.id;

    if (!req.AuthIsAdmin == true) {
        whereStatement.userId = req.userId;
    }

    try {
        const post = await models.Post.findOne({
            where: whereStatement,
        });
        await post.destroy();
        return res.status(201).json({
            message: "Post supprimé !",
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Post non trouvé !" });
    }
};
