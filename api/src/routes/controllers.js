const {Pokemon, Type } = require('../db.js')
const axios = require("axios");

async function getPokemonsDb() {
    let pokemonsDb = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['id', 'name']
        }
    });
    return pokemonsDb
};


async function getPokemonsApi() {
    const pokemonsUrlApi = await axios(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3'
        // Hago el "fetch" a la api y me traigo 3 en total
    )
    const pokemonUrl = pokemonsUrlApi.data.results.map(e => e.url)
    //Me guardo el url que lleva al detalle de cada pokemon
    let arrayPokemons = []
    for(let i=0; i<pokemonUrl.length; i++) {
        let url = await axios(pokemonUrl[i]);
        arrayPokemons.push({
            id: url.data.id,
            name: url.data.name,
            height: url.data.height,
            weight: url.data.weight,
            life: url.data.stats[0].base_stat,
            attack: url.data.stats[1].base_stat,
            defense: url.data.stats[2].base_stat,
            speed: url.data.stats[5].base_stat,
            img: url.data.sprites.front_default,
        })      
    }
    return arrayPokemons;
}

async function getAllPokemons() {
    let pokemonsDb = await getPokemonsDb();
    let pokemonsApi = await getPokemonsApi();
    let allPokes = pokemonsApi.concat(pokemonsDb)
    return allPokes
}

async function getPokemonById(id) {
    const pokemonUrl = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
    // console.log(pokemonUrl)
    // console.log(pokemonUrl.data)
    let poke = {
            id: pokemonUrl.data.id,
            name: pokemonUrl.data.name,
            height: pokemonUrl.data.height,
            weight: pokemonUrl.data.weight,
            hp: pokemonUrl.data.stats[0].base_stat,
            attack: pokemonUrl.data.stats[1].base_stat,
            defense: pokemonUrl.data.stats[2].base_stat,
            speed: pokemonUrl.data.stats[5].base_stat,
            img: pokemonUrl.data.sprites.front_default,
    }
    // console.log(poke)
    return poke
}

module.exports = {
    getPokemonsDb,
    getPokemonsApi,
    getAllPokemons,
    getPokemonById
}