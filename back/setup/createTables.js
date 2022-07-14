require("dotenv").config();
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        dialectOptions: {
            charset: "utf8mb4",
        },
    }
);

const queryInterface = sequelize.getQueryInterface();

try {
    sequelize.authenticate();
    console.log(
        "\x1b[32m%s\x1b[0m",
        "Connection has been established successfully."
    );
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

setup();

async function setup() {
    await queryInterface.createTable("users", {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "Default.png",
            // allowNull defaults to true
        },
        isAdmin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    console.log("\x1b[32m%s\x1b[0m", "Create users table");

    await insertAdmin();

    await queryInterface.createTable(
        "posts",
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
            },
            image: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        }
    );

    console.log("\x1b[32m%s\x1b[0m", "Create posts table");

    await queryInterface.createTable("comments", {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    console.log("\x1b[32m%s\x1b[0m", "Create comments table");

    await queryInterface.createTable("liked_posts", {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    console.log("\x1b[32m%s\x1b[0m", "Create liked_posts table");

    await queryInterface.createTable("shared_posts", {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    console.log("\x1b[32m%s\x1b[0m", "Create shared_posts table");

    return;
}

async function insertAdmin() {
    const User = sequelize.define(
        "user",
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
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
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

    bcrypt.hash("admin@test.fr", 10).then(async (hash) => {
        // Create a new user
        await User.create({
            firstName: "admin",
            lastName: "account",
            email: "admin@test.fr",
            isAdmin: 1,
            password: hash,
        }).then((newUser) => {
            console.log("newUser auto-generated ID: " + newUser.id);
        });
    });

    console.log(
        "\x1b[32m%s\x1b[0m",
        "Insert admin user, id/password : admin@test.fr"
    );

    return;
}
