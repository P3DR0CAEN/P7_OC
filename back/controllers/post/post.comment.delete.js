const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    try {
        const comment = await models.Comment.findOne({
            where: {
                userId: req.userId,
                id: req.params.id,
            },
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
