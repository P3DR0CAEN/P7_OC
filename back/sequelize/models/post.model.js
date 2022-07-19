const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define(
        "Post",
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                notEmpty: true,
            },
            image: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Other model options go here
            // don't forget to enable timestamps!
            timestamps: true,

            // I want updatedAt to actually be called created_at
            createdAt: "created_at",

            // I want updatedAt to actually be called updated_at
            updatedAt: "updated_at",
        }
    );

    sequelize.define(
        "shared_posts",
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Other model options go here
            // don't forget to enable timestamps!
            timestamps: true,

            // I want updatedAt to actually be called created_at
            createdAt: "created_at",

            // I want updatedAt to actually be called updated_at
            updatedAt: "updated_at",
        }
    );

    sequelize.define(
        "liked_posts",
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Other model options go here
            // don't forget to enable timestamps!
            timestamps: true,

            // I want updatedAt to actually be called created_at
            createdAt: "created_at",

            // I want updatedAt to actually be called updated_at
            updatedAt: "updated_at",
        }
    );
};
