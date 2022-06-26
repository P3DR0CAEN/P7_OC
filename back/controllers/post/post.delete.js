const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    try {
        const post = await models.Post.findOne({
            where: {
                userId: req.userId,
                id: req.params.id,
            },
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
