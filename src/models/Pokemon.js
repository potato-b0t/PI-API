const { DataTypes } = require('sequelize');
const axios = require("axios")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const pokemon = sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    Life: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    Attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });

};
