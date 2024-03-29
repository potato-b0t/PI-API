const { Pokemon, Type, Pokemontype } = require("../db")
const axios = require("axios")

module.exports = {
    GetPokemons: async (req, res) => {
        const { name } = req.query
        console.log(name)
        try {
            if (!name) {
                let pokemons = await Pokemon.findAll()

                if (pokemons.length <= 0) throw new Error("no pokemons found")

                return res.status(200).json(pokemons)
            }
            const pokemon = await Pokemon.findOne({ where: { name } })

            if (pokemon) return res.status(200).json(pokemon)
            throw new Error("pokemon did't found")
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    GetPokemonByID: async (req, res) => {
        const id = req.params['idPokemon']
        console.log(parseInt(id))
        try {
            let pokemon = await Pokemon.findOne({ where: { id } })


            if (pokemon != undefined) {
                pokemon = pokemon.dataValues
                const types = await Pokemontype.findAll({ where: { pokemonId: pokemon.id } })

                let typesID = []

                for (let type of types) typesID.push(type.typeId)

                pokemon = {
                    ...pokemon,
                    typesID
                }
                return res.status(200).json(pokemon)
            } else {
                pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).data
                let pokemonWithData = {
                    id: pokemon.id, name: pokemon.name, Image: pokemon.sprites.front_default, Life: pokemon.stats[0], Attack: pokemon.data.stats[1].base_stat,
          Defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat
                }
                let typesID = []

                for (let type of pokemon.types) typesID.push(await Type.findOne({where: {id: type.type.name}}))

                pokemon = {
                    ...pokemon,
                    typesID
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        } 
    },
    CreatePokemon: async (req, res) => {
        const { id, name, image, Life, Attack, Defense, speed, types } = req.body
        console.log(id)
        try {
            const pokemonCreated = await Pokemon.create({
                id,
                name,
                Image: image,
                Life,
                Attack,
                Defense,
                speed
            })

            for (let type of types) {
                await Type.findOne({ where: { id: type.id } }).then(async response => await Pokemontype.create({ pokemonId: pokemonCreated.id, typeId: response.id }))
            }
        } catch (err) {
            console.log(err)
            return res.status(404).json(err)
        }
    },
    GetTypes: async (req, res) => {
        try {
            return res.status(200).json(await Type.findAll())
        } catch (error) {

        }
    }
}
