function applyExtraSetup(sequelize) {
    const { User, Post } = sequelize.models;

    User.hasMany(Post);
    Post.belongsTo(User);

    User.belongsToMany(Post, {
        as: "sharedPosts",
        through: "shared_posts",
    });
    Post.belongsToMany(User, {
        as: "sharedBy",
        through: "shared_posts",
    });

    User.belongsToMany(Post, {
        as: "likedPosts",
        through: "liked_posts",
    });
    Post.belongsToMany(User, {
        as: "likedBy",
        through: "liked_posts",
    });
}

module.exports = { applyExtraSetup };
