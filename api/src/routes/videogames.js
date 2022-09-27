const { Router } = require('express');
const { Videogame, Genre} = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;
require('dotenv').config();
const getApiGames = require('../utils/getApiGames')

const getMyData = require('../utils/getMyData');



const router = Router();

router.get("/", async (req, res, next) => {
  
    // Caja de variables ......................
  let instanceApi;
  let instanceMine;
  let name = req.query.name;
  let page = req.query.page;
  // ........................................
  // If no page --> page = 1
  if (!page) {
    page = 1;
  }
  //.........................................

  try {
    if (name) {
      // Si existe un name por ahora lo dejaremos igual
      instanceApi = await getApiGames(name);

      // Claro.. Puedo hacerlo con arrays
      instanceMine = await getMyData(name);

    } else { // Case No name
      
      instanceApi = await getApiGames();
      instanceMine = await getMyData();

    }

    // Comienza la devolución ....................................
    Promise.all([instanceApi, instanceMine]).then((x) => {
      const [instanceApi, instanceMine] = x;

      let filterCharacters = instanceApi.map((e) => {
       let obj = {
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map(g => {
                return g.name;
            }),

        }
        return obj;
      });

      let allVideogames = [...instanceMine, ...filterCharacters];
      // Envío

      // Si no encuentro nada, devolveré un array con solo un objeto preparado
      if(allVideogames.length === 0){


        let obj = {
          id: uuidv4(),
          name: "Not Found",
          released: "00-00-0000",
          image: "https://pandagila.com/wp-content/uploads/2020/08/error-404-not-found.jpg",
          rating: 0,
          description: "The game has 0 results",
          genres: [],
          platforms: [],
        };
        return res.send([obj]).status(404);
      }

      res.send(allVideogames);
    });
  } catch (e) {
    next(e);
  }

  // Complete: Hay alguna manera de combinar esto con async await? La descubrí, simplemente quería dejarlo en modo Promesas para mantener más diversidad de código
});





/*router.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        let allGamesNames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`)).data.results;
        let namesDb = await Videogame.findAll({
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
                    id: e.id,
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
            let pageOne = [];
            let pageTwo = [];
            let pageThree = [];
            
            
            
            pageOne = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
            let uri = pageOne.data.next
            pageOne = [...pageOne.data.results];

            pageTwo = await axios.get(uri);
            uri = pageTwo.data.next;
            pageTwo = [...pageTwo.data.results];

            pageThree = await axios.get(uri);
            pageThree = [...pageThree.data.results];

            return[...pageOne, ...pageTwo,...pageThree];


           
   
           // const getGame4 = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`)).data.results;
            /*const resGame = getGame.concat(getGame1, getGame2, getGame3)
            const gamesDb = await Videogame.findAll();
            let gamesAll = resGame.map(e => {
                let obj = {
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    genres: e.genres.map(g => {
                        return g.name;
                    }),

                }
                return obj;
            });
            res.json([...gamesDb, ...gamesAll]);//me trae todos los juegos de la base de datos y tambien todos los de la api
        }
         
        } catch (err) {
        res.status(400).json({ err });
        }*/








router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) { //si el id no es un numero
        
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
