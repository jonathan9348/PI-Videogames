import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GAME_DETAILS = 'GAME_DETAILS';
export const GET_GENRES = 'GET_GENRES';
export const CREATE_GAMES = 'CREATE_GAMES';
export const ALF_ORDER = 'ALF_ORDER';
export const RATING_ORDER = 'RATING_ORDER';
export const FILTER_DB = 'FILTER_DB';
export const FILTER_GENRES = 'FILTER_GENRES';
export const FILTER_GAMES = 'FILTER_GAMES';


//Traer todos los videojuegos
export function getVideogames(){
    return async (dispatch) => {
     
        const { data } = await axios.get("http://localhost:3001/videogames");
        return dispatch({
          type: "GET_VIDEOGAMES",
          payload: data,
        });
     
  };
}
//Buscar videojuego por nombre
export function searchVideogames(name){
    return async function(dispatch){
        try{
            const videogame = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({type: SEARCH_VIDEOGAMES,
                            payload: videogame.data})
        }catch(err){
            console.log(err)
        }
    }
}

//Traer videojuegos por id
export function gameDetails(id){
    return async function(dispatch){
        try{
            const videoDetail = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({type: GAME_DETAILS,
                            payload: videoDetail.data})
        }catch(err){
            console.log(err);
        }
    }
}

//Traer todos los géneros
export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data  
        })
    }
}

//Crear videojuego
export function createGame(payload){
    return async function(dispatch){
        const createVideogame= await axios.post('http://localhost:3001/videogames', payload) 
        return createVideogame;
    }
};

//Ordenar alfabeticamente
export function alfOrder(order){
    return {
        type: ALF_ORDER,
        payload: order,
    }
}

//Ordenar por rating
export function ratingOrder(order){
    return {
        type: RATING_ORDER,
        payload: order,
    }
}

//filtar en db
export function filterDb(type){
    return{
        type: FILTER_DB,
        payload: type,
    }
};

//filtrar por géneros
export function filterGenres(type){
    return{
        type: FILTER_GENRES,
        payload: type,
    }
};

