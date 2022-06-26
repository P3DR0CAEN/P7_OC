const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    await models.Post.findAll({
        order: [["created_at", "DESC"]],
        include: models.User,
    })
        .then(async (posts) => {
            return res.status(200).json(posts);
        })
        .catch((error) => {
            console.log(error);
            return res.status(401).json({ error: "posts non trouvé !" });
        });
};
