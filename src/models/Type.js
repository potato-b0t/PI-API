const { DataTypes } = require('sequelize');
const axios = require("axios")
module.exports = (sequelize) => {

  const typeModel = sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  })

}