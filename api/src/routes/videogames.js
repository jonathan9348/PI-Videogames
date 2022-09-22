const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;
require('dotenv').config();




const router = Router();



router.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        const allGamesNames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`)).data.results;
        const namesDb = await Videogame.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
            include: [
                {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        if (name) {

            const result = allGamesNames.map(e => {
                let obj = {
                    name: e.name,
                    image: e.background_image,
                    genres: e.genres.map(g => {
                        return g.name;
                    }),

                }
                return obj;
            });
            result.length ?
                res.status(200).json([...namesDb, ...result]) :
                res.status(400).send('No existe el videojuego')

        } else {
            const getGame = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)).data.results;
            /*const getGame1 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)).data.results;
            const getGame2 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`)).data.results;
            const resGame = getGame.concat(getGame1, getGame2)*/
            const gamesDb = await Videogame.findAll();
            let gamesAll = getGame.map(e => {
                let obj = {
                    name: e.name,
                    image: e.background_image,
                    genres: e.genres.map(g => {
                        return g.name;
                    }),

                }
                return obj;
            });
            res.json([...gamesDb, ...gamesAll]);//me trae todos los juegos de la base de datos y tambien todos los de la api*/
        }
    } catch (err) {
        res.status(400).json({ err });
    }

}




); //Ruta terminada

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) { //si el id no es un numero
        try {
            const vgDb = await Videogame.findByPk(id, { //buscamos en la base de datos ya que los id autogenerados con uuid siempre seran alfanumericos
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            res.status(200).json(vgDb)

        } catch (err) {
            res.status(400).send('No existe juego con el Id alfanumérico solicitado')

        }
    } else { //si es un id numerico buscara en la api
        try {
            const vgApi = await axios.get(`https://api.rawg.io/api/games/${id}`, {
                params: { key: API_KEY },
            });



            const videoApi = vgApi.data;
            const objVg = {
                id: videoApi.id,
                name: videoApi.name,
                description: videoApi.description,
                released: videoApi.released,
                rating: videoApi.rating,
                image: videoApi.background_image,
                platforms: videoApi.platforms.map(e => e.platform.name),
                genres: videoApi.genres.map(g => g.name),
            }

            res.status(200).json(objVg);

        } catch (err) {
            res.status(400).send('No existe el Id numérico solicitado');
        }

    }
}) //ruta terminada

router.post('/', async (req, res, next) => {
    const { name, description, released, rating, image, genre, platforms} = req.body;

    try {
        const existGame = await Videogame.findOne({
            where: { name }
        });
        if (existGame) res.status(400).send('Ya existe dicho videojuego');

        const newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            image,
            platforms
        });

        const vg_genre = await Genre.findAll({
                   where:{name}
             })
           
            newVideogame.addGenre(vg_genre)

        res.status(200).json(newVideogame);
    } catch (err) {
        next(err);
    }
});//Ruta terminada



module.exports = router;
