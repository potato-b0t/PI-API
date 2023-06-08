const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const pokemontypemodel = sequelize.define('pokemontype', {

        pokemonId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER(),
            allowNull: false
        }


    }
    )

}