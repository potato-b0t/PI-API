//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Pokemon, Type, Pokemontype } = require('./src/db.js');
const axios = require("axios")

function relations() {
  Pokemon.belongsToMany(Type, { through: Pokemontype })
  Type.belongsToMany(Pokemon, { through: Pokemontype })
}

async function fillDB() {
  //get types from api
  const response = await axios.get("https://pokeapi.co/api/v2/type")

  response.data.results.forEach(async type => {
    Type.create({
      name: type.name
    })
  })

  //get pokemon from api

  const apiResult = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1281")

  await apiResult.data.results.forEach(async (Poke) => {
    try {
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Poke.name}`)

      if (pokemon.data.sprites.front_default) {
        const pokemonCreated = await Pokemon.create({
          id: pokemon.data.id,
          name: pokemon.data.name,
          Image: pokemon.data.sprites.front_default,
          Life: pokemon.data.stats[0].base_stat,
          Attack: pokemon.data.stats[1].base_stat,
          Defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat
        })

        for (let types of pokemon.data.types) {

          await Type.findOne({ where: { name: types.type.name } }).then(async response => await Pokemontype.create({ pokemonId: pokemonCreated.id, typeId: response.id }))

        }

      }
    }
    catch (err) {

    }

  })
  console.log("DB Filled")

}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    relations()
    fillDB()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
