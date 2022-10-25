const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type } = require('../db.js');
const { getPokemonsDb } = require('./controllers.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
    try {
        let pokemonsDb = await getPokemonsDb();
        res.status(200).json(pokemonsDb())
    } catch (error) {
        res.status(404).send(error)
    }
});


module.exports = router;
