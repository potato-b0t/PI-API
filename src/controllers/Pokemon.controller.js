const { Pokemon, Type, Pokemontype } = require("../db")

module.exports = {
    GetPokemons: (req, res) => {
        const { name } = req.query
        try {

            let response
            if (name) {
                response = this.GetOnePokemon(name)
            } else {
                response = this.GetAllPokemons()
            }

            return res.status(200).json(response)
        } catch (error) {

        }
    },
    GetAllPokemons: async () => {

        const Pokemons = await Pokemon.findAll()
        
        let response = []

        Pokemons.forEach(async pokemon => {
            const typesInPokemon = await Pokemontype.findAll({where : { pokeID: pokemon.ID }})
            let types = []

            typesInPokemon.forEach(async type => {
                const typesGot = (await Type.findAll({ where: { ID: type.typeID } }))
                typesGot.forEach(type => {
                    types.push(type.name)
                })
            })
            type = types

            response.push(...pokemon, type )
        })
        return response

    },
    GetOnePokemon: (name) => {
        return Pokemon.findOne({ where: { name } })
    }
}