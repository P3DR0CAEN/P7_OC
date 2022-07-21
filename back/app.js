require("dotenv").config();

const sequelize = require("./sequelize/index");

const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./routes/UserRoute");
const postRoute = require("./routes/PostRoute");

const path = require("path");

const app = express();

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());

app.use("/images/users", express.static(path.join(__dirname, "images/users")));
app.use("/images/posts", express.static(path.join(__dirname, "images/posts")));

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.use(function (err, req, res, next) {
    res.status(500).send("Une erreur est survenue !");
    next();
});

module.exports = app;
