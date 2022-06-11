require("dotenv").config();

const sequelize = require("./sequelize/index");

const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./routes/UserRoute");

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

app.use("/api/auth", userRoute);

/* app.use(function (err, req, res, next) {
    res.status(500).send("Une erreur est survenue !");
    next();
}); */

module.exports = app;
