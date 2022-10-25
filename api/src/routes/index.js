const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type } = require('../db.js');
const { getPokemonsDb, getPokemonsApi, getAllPokemons } = require('./controllers.js');


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
        res.status(404).send('Error')
    }
});

router.get('/pokemons', async (req, res) => { //Ruta para todos los pokemon
    try {
        let allPokes = await getAllPokemons()
        res.status(200).send(allPokes)
    } catch (error) {
        res.send(error)
    }
})

router.post('/pokemons', async (req, res) => {
    const { name } = req.body
    if(!name) return res.status(400).send('Falta enviar el nombre del Pokemon')
    try {
        let pokemon = await Pokemon.create(req.body)
        res.status(200).send(pokemon)
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;
