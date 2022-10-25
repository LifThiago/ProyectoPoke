const {Pokemon, Type } = require('../db.js')

async function getPokemonsDb() {
    let pokemonsDb = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['id', 'name']
        }
    });
    return pokemonsDb
};

module.exports = {
    getPokemonsDb
}