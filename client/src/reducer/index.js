import {GET_VIDEOGAMES, SEARCH_VIDEOGAMES, GAME_DETAILS, GET_GENRES, CREATE_GAMES, ALF_ORDER, RATING_ORDER, FILTER_DB, FILTER_GENRES} from '../actions/index';

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: []
};

export default function rootReducer(state = initialState, action) {

    switch(action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        
        case SEARCH_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload,
            }

        case GAME_DETAILS:
            return{
                ...state,
                details: action.payload
            }

        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        
        case CREATE_GAMES:
            return{
                ...state,
            }

        case ALF_ORDER:
                let orderAlf = action.payload === 'asc_name' ?
                state.videogames.sort((a,b) =>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }) : state.videogames.sort((a,b) =>{
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                    return 0;
                })
                return {
                    ...state,
                    videogames: orderAlf,
                }

            case RATING_ORDER:
                
                let orderRating = action.payload === 'asc_name' ?
                state.videogames.sort((a,b) =>{
                    if(a.rating > b.rating) return 1;
                    if(a.rating < b.rating) return -1;
                    return 0;
                }) : state.videogames.sort((a,b) =>{
                    if(a.rating < b.rating) return 1;
                    if(a.rating > b.rating) return -1;
                    return 0;
                })
                return {
                    ...state,
                    videogames: orderRating,
                }

                
            

            case FILTER_GENRES:
                const allGames = state.allVideogames;
                const genresFiltered = action.payload === "All" ? allGames
                    : allGames.filter((el) => el.genres?.includes(action.payload));
                    if (genresFiltered.length === 0) {
                      alert(`No videogames found for ${action.payload} genre`)
                      return state} else {
                return{
                  ...state,
                  videogames: genresFiltered,
                }}
                    
        
         
                

                case FILTER_DB:
                    const createdFilter = action.payload === 'Created'
                    ? state.allVideogames.filter(e => e.createdInDb)
                    : state.allVideogames.filter(e => !e.createdInDb);

                    return {
                        ...state,
                        videogames: createdFilter,
                    }
                    default:
                        return state;

                }
            }
        


