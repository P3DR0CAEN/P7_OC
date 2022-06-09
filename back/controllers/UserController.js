require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
	try {
		// Create a new user
		const jane = await User.create({
			firstName: "Jane",
			lastName: "Doe",
			email: req.body.email,
			password: req.body.password,
		});
		if (jane) {
			console.log("Jane's auto-generated ID:", jane.id);
		}
	} catch (error) {
		console.log(error.parent.text);
		res.status(500).json(error.parent);
	}
};
