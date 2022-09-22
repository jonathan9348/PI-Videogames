const {Router} = require('express');
const {Genre} = require('../db');
const {API_KEY} = process.env;
const axios = require('axios');
require ('dotenv').config();

const router = Router();
 


router.get('/', async(req, res) =>{
    //traerme todos los generos posibles
    //guardarlos dentro de la base de datos para luego usarlos desde alli
    try{
        const inst = await Genre.findAll()

        res.json(inst);

    }catch(err){
        res.status(400).json({err: error})
;    }
    
    
})

module.exports = router;

