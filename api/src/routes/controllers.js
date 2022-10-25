const {Pokemon, Type } = require('../db.js')

async function getPokemonsDb() {
    let pokemons = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['id', 'name']
        }
    });
    return pokemons
}

module.exports = {
    getPokemonsDb
}