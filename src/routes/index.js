const { Router } = require('express');
const { Type } = require("../db")
const { GetPokemons, GetPokemonByID, CreatePokemon, GetTypes } = require('../controllers/Pokemon.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.route("/pokemons").get(GetPokemons).post(CreatePokemon)
router.route("/pokemons/:idPokemon").get(GetPokemonByID)
router.route("/types").get(async (req, res) => res.status(200).json(await Type.findAll()))



module.exports = router;
