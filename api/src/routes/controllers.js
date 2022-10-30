const {Pokemon, Type } = require('../db.js')
const axios = require("axios");

async function getPokemonsDb() {
    let pokemonsDb = await Pokemon.findAll({
        // include: {
        //     model: Type,
            attributes: ['id', 'name', 'img', 'type'],
        //     through: {
        //         attributes: [type]
        //     }
        // }
    });
    return pokemonsDb
};


async function getPokemonsApi() {
    try {
        let arrayPokemons = []
    
        const firstCallApi = await axios('https://pokeapi.co/api/v2/pokemon')
        // Hago el "fetch" a la api
        const secondCallApi = await axios(firstCallApi.data.next)
        // return firstCallApi.data.results.map(e => e.url)
    
        const firstPokemonUrl = firstCallApi.data.results.map(e => e.url)
        const SecondPokemonUrl = secondCallApi.data.results.map((e) => e.url)
    
        const allPokemonUrl = firstPokemonUrl.concat(SecondPokemonUrl)
        const allPokemonsPromises = await Promise.all(allPokemonUrl)
        
        for(let i = 0; i < allPokemonsPromises.length; i++) {
            const url = await axios(allPokemonsPromises[i]);
            arrayPokemons.push({
                id: url.data.id,
                name: url.data.name,
                type: url.data.types.map(e => e.type.name),
                img: url.data.sprites.front_default,
            })      
        }
        return arrayPokemons;
    } catch (error) {
        return error
    }
}

async function getAllPokemons() {
    let pokemonsDb = await getPokemonsDb();
    let pokemonsApi = await getPokemonsApi();
    let allPokes = pokemonsApi.concat(pokemonsDb)
    return allPokes
}

async function getPokemonById(value) {
    if(value.length > 15) {
        let poke = Pokemon.findOne({
            where: {
                id: value
            }
        })
        return poke
    } else {
    return getPokemonByIdApi(value)
}
}

async function getPokemonByIdApi(value) {
    try {
        const pokemonUrl = await axios(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase().trim()}`)
        let pokemon = {
                id: pokemonUrl.data.id,
                name: pokemonUrl.data.name,
                height: pokemonUrl.data.height,
                weight: pokemonUrl.data.weight,
                hp: pokemonUrl.data.stats[0].base_stat,
                attack: pokemonUrl.data.stats[1].base_stat,
                defense: pokemonUrl.data.stats[2].base_stat,
                speed: pokemonUrl.data.stats[5].base_stat,
                type: pokemonUrl.data.types.map(e => e.type.name),
                img: pokemonUrl.data.sprites.front_default,
        }
        return pokemon
    } catch (error) {
        return 'No se encontro un pokemon con ese Id'
    }
}

async function getPokemonByName(name) {
    let pokemon = await Pokemon.findOne({
        where: {
            name: name
        }
    });
    if(!pokemon) return getPokemonById(name)
    return pokemon
}

async function getTypes() {
    let typesAPi = await axios('https://pokeapi.co/api/v2/type')
    let arrayTypes = typesAPi.data.results.map(e => {return {name: e.name}})

    await Type.bulkCreate(arrayTypes)

    let typesDb = await Type.findAll({
        // include: {
        //     model: Pokemon,
            attributes: ['id', 'name']
        // }
    });
    return typesDb
}

async function createPokemon(values) {
    const { name, hp, height, weight, attack, defense, speed, type, img} = values
    try {
        let exist = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
        if(exist) return 'El nombre de este pokemon ya existe en la API'
    } catch (error) {
        let pokemon = await Pokemon.create(values)
        return pokemon
    }
}


module.exports = {
    getPokemonsDb,
    getPokemonsApi,
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    getTypes,
    createPokemon
}