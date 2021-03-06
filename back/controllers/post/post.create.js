const { models } = require("../../sequelize");

module.exports = async (req, res, next) => {
    let imageName = null;
    if (typeof req.file !== "undefined") {
        imageName = req.file.filename;
    }

    if (req.body.content == "") {
        return res.status(500).json({
            error: "Le contenu ne peut pas être vide !",
        });
    }

    await models.Post.create(
        {
            content: req.body.content,
            image: imageName,
            userId: req.userId,
        },
        {
            omitNull: true,
        }
    )
        .then((newPost) => {
            console.log("newPost auto-generated ID: " + newPost.id);
            return res.status(201).json({
                message: "Votre post à bien été créer !",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error: "Une erreur est survenue !",
            });
        });
};
