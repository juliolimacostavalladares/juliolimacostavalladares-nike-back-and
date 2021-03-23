require("dotenv").config()
const { Sequelize, DataTypes } = require('sequelize');
const dbConnec = require('../config/db');

const sequelize = new Sequelize(dbConnec);

const Products = sequelize.define('Products', {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  prod_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prod_data: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prod_month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prod_img: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize
});

console.log(Products === sequelize.models.Products);

module.exports = Products;