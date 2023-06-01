const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const PokemonXType = sequelize.define('pokemontype', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        pokeID: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        typeID: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }


    }
    )
    
}