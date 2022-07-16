const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: true,
            },
            image: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
            isAdmin: {
                type: DataTypes.INTEGER,
                // allowNull defaults to true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
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
