// imports sequelize module
const Sequelize = require('sequelize');
// loads environment variables from .env file
require('dotenv').config();

// creates Sequelize instance using .env file
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		dialect: 'mysql',
		port: 3306,
	},
);

module.exports = sequelize;
