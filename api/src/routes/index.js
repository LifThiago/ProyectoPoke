const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type } = require('../db.js');
const { getPokemonsDb, getPokemonsApi, getAllPokemons, getPokemonById, getPokemonByName, getTypes, createPokemon } = require('./controllers.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokedb', async (req, res, next) => { //Ruta para los pokemon de DB
    try {
        let pokemonsDb = await getPokemonsDb();
        res.status(200).json(pokemonsDb)
    } catch (error) {
        res.status(404).send(error)
    }
});

router.get('/pokeapi', async (req, res, next) => { // Ruta para los pokemon de API
    try {
        let pokemonsApi = await getPokemonsApi();
        console.log(pokemonsApi)
        res.status(200).json(pokemonsApi)
    } catch (error) {
        res.status(404).send(error)
    }
});

router.get('/pokemons', async (req, res) => { //Ruta para todos los pokemon
    const { name } = req.query
        if (name) {
            try {
                let pokemon = await getPokemonByName(name)
                res.status(200).send(pokemon)
            } catch (error) {
                res.send(error)
            }
        } else {
            try {
                let allPokes = await getAllPokemons()
                res.status(200).json(allPokes)
            } catch (error) {
                res.send(error)
            }
        }
})

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params
    try {
        let pokemon = await getPokemonById(id)
        res.status(200).send(pokemon)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/pokemons', async (req, res) => {
    const { name } = req.body
    if(!name) return res.status(400).send('Falta enviar el nombre del Pokemon')
    try {
        let pokemon = await createPokemon(req.body)
        // let pokemon = await Pokemon.create(req.body)
        res.status(200).send(pokemon)
    } catch (error) {
        res.send('Este pokemon ya existe en la DB')
    }
})

router.get('/types', async (req, res) => {
    let result = await getTypes()
    res.send(result)
})



module.exports = router;
