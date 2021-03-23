require("dotenv").config()
const { Sequelize } = require("sequelize");
const Products = require("../Models/Products");
const dbConnec = require("../config/db");

const sequelize = new Sequelize(dbConnec);

module.exports = sequelize;