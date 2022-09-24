const axios = require('axios');
const {Platform} = require('../db');
const {API_KEY} = process.env;

async function allPlatforms(){
    try{
        let platformsDb = await Platform.findAll();

    if(!platformsDb.length){
        let platformObj = {};

        let response = await axios.get(`https://api.rawg.io/api/games/47137?key=${API_KEY}`);
        let platMap = response.data.platforms.map(e => platformObj = {name: e.platform.name});

        platMap.forEach(p => Platform.create(p));
        return platMap;
    }
    return platformsDb; 

    }catch(err){
        console.log('err')

    }
    
}

module.exports = allPlatforms;