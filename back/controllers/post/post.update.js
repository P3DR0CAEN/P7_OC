const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    let imageName = null;
    if (typeof req.file !== "undefined") {
        imageName = req.file.filename;
    }
    if (req.body.removeImg == 1) {
        imageName = "";
    }

    await models.Post.update(
        {
            content: req.body.content,
            image: imageName,
        },
        {
            where: {
                id: req.body.postId,
                userId: req.userId,
            },
            omitNull: true,
        }
    )
        .then((response) => {
            return res.status(201).json({
                message: "Post mis a jour !",
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
