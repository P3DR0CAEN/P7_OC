const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = require("../config/sequelize");
/* console.log(sequelize); */

class User extends Model {}

User.init(
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
			// allowNull defaults to true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email_verified_at: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		remember_token: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		// Other model options go here
		sequelize, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name

		// don't forget to enable timestamps!
		timestamps: true,

		// I want updatedAt to actually be called created_at
		createdAt: "created_at",

		// I want updatedAt to actually be called updated_at
		updatedAt: "updated_at",
	}
);

// the defined model is the class itself
/* console.log(User === sequelize.models.User); */ // true

module.exports = sequelize.models.User;
