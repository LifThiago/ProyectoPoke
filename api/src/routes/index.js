const { default: axios } = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type, PokemonsTypes } = require('../db.js');
const { getPokemonsDb, getPokemonsApi, getAllPokemons, getPokemonById, getPokemonByName, getTypes, createPokemon } = require('./controllers.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => { //Ruta para todos los pokemon
            try {
                let allPokes = await getAllPokemons()
                res.status(200).send(allPokes)
            } catch (error) {
                res.send(error)
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

router.get('/types', async (req, res) => {
    try {
        let result = await getTypes()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

router.post('/pokemons', async (req, res) => {
    const { name, type } = req.body
    try {
        if(!name) res.status(400).send('Falta enviar el nombre del pokemon')
        else {
            let pokemon = await createPokemon(req.body)
            res.status(200).send(pokemon)
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;