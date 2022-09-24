const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

async function genresApi() {
    try{
        const gen = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiGen = gen.data.results;

    apiGen.forEach(e => {
        Genre.findOrCreate({
            where: { name: e.name, id: e.id }
        })
    })
    return 'Ok';

    }catch(err){
        console.log('no')

    }
    
}

module.exports = genresApi;