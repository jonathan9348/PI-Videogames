import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gameDetails } from '../actions';
import { Link } from 'react-router-dom';




export default function VideogameDetail() {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(gameDetails(id))
    }, [dispatch, id]);

    const games = useSelector((state) => state.details);
    console.log(games)



    return (
        <div>
            <h1>VideogameDetail</h1>
            
                <div>
                    <h1>{games.name}</h1>
                    <img src={games.img ? games.img : games.image} alt='' width='300px' height='250px' />

                    <div>
                        <h5>
                            {games.released}
                        </h5>
                    </div>

                    <div>
                        <h5>Description:</h5>
                        <p>{games.description}</p>
                    </div>

                    <div>
                        It's an{' '}
                        {!games.createdInDb
                        ? games.genres + ' '
                        : games.genres.map((e)=> e.name+ ' ')}
                        game ranked at {games.rating} points.
                    </div>
                    
                    <div>
                        <p>Play it at {games.platforms}</p>
                    </div>

                    <Link to="/home">
                        <button className="botback" type="submit">🡸</button>
                    </Link>
                    
                    </div>
            
            
        
        </div>
        )
    }

