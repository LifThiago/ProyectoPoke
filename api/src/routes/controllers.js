const {Pokemon, Type } = require('../db.js')
const axios = require("axios");

async function getPokemonsDb() {
    let pokemonsDb = await Pokemon.findAll({
        // include: {
        //     model: Type,
            attributes: ['id', 'name', 'img', 'type', 'createdDb', 'attack'],
            // attributes: ['id', 'name', 'img'],
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
        // const firstCallApi = await axios('https://pokeapi.co/api/v2/pokemon?limit=10')
        // Hago el "fetch" a la api
        const secondCallApi = await axios(firstCallApi.data.next)
        // return firstCallApi.data.results.map(e => e.url)
    
        const firstPokemonUrl = await firstCallApi.data.results.map((e) => e.url)
        const SecondPokemonUrl = await secondCallApi.data.results.map((e) => e.url)
    
        const allPokemonUrl = await firstPokemonUrl.concat(SecondPokemonUrl)
        const allPokemonsPromises = await Promise.all(allPokemonUrl)
        
        for(let i = 0; i < allPokemonsPromises.length; i++) {
            const url = await axios(allPokemonsPromises[i]);
            arrayPokemons.push({
                id: url.data.id,
                name: url.data.name,
                type: url.data.types.map(e => e.type.name),
                img: url.data.sprites.front_default,
                attack: url.data.stats[1].base_stat
            })      
        } 
        return arrayPokemons;
    } catch (error) {
        return error
    }
}

async function getAllPokemons() {
    try {
        let pokemonsDb = await getPokemonsDb();
        let pokemonsApi = await getPokemonsApi();
        // let allPokes = await pokemonsDb.concat(pokemonsApi)
        let allPokes = await pokemonsApi.concat(pokemonsDb)
        return allPokes
    } catch (error) {
        return error
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

// async function getPokemonById(value) {
//     if(value.length > 15) {
//         let poke = Pokemon.findOne({
//             where: {
//                 id: value
//             }
//         })
//         return poke
//     } else {
//     return getPokemonByIdApi(value)
// }
// }
async function getPokemonById(value){
    try {
        if(value.length > 15) {
            let poke = await Pokemon.findByPk(value)
            return poke
        } else {
            let poke = await Pokemon.findOne({
                where:{
                    name: value
                }
            })
            if(poke){ return poke }
            else {
                return getPokemonByIdApi(value)
            }
        }
    } catch (error) {
        return error
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

    let typesExist = await Type.findAll()
    if(typesExist.length > 0){
        return typesExist
    } else {
        await Type.bulkCreate(arrayTypes)
        let typesDb = await Type.findAll({
            attributes: ['id', 'name']
        })
        return typesDb
    }
}

// async function createPokemon(values) {
//     const { name, hp, height, weight, attack, defense, speed, type, img} = values
//     try {

//         let exist = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
//         if(exist) return `El nombre ${name} ya existe en la API, proba con otro nombre`

//     } catch (error) {

//         let pokemon = await Pokemon.create(values)

//         let typesDb = await Type.findAll({
//             where: {
//                 name: type
//             }
//         })

//         await pokemon.addType(typesDb)
//         return pokemon
//     }
// }

async function createPokemon(values) {
    const { name, hp, height, weight, attack, defense, speed, type, img} = values
    try {
        let pokemon = await Pokemon.findOrCreate({
            where: {name: name},
            defaults: {
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                type
            }
        })

        const types = Type.findAll()
        if(types.length === 0) {
            await getTypes()
        }

        if(pokemon[1] === false) {
            return 'Este pokemon ya existe, elegí otro nombre'
        }

        else {
            let typesDb = await Type.findAll({
                where:{
                    name: type
                }
            })
            await pokemon[0].addType(typesDb)
            return pokemon
        }
    
    } catch (error) {
        return error
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