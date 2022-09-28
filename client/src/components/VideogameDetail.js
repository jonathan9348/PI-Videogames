import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gameDetails } from '../actions';
import { Link } from 'react-router-dom';
import './styles/Detail.css';




export default function VideogameDetail() {

    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(gameDetails(id))
    }, [dispatch, id]);

    const games = useSelector((state) => state.details);
    console.log(games)



    return (
        <div className='content'>
        
            <div >
                <h1 className='title-page'>Videogame Detail</h1>
            </div>
            
            
            <div>
                <h1 className='title-game'>{games.name}</h1>
            </div>
                    
                    <img src={games.img ? games.img : games.image} alt='' className='img-st' />

                    <div>
                        <h5 className='released'>
                           Released: {games.released}
                        </h5>
                    </div>

                    <div className='cont-p'>
                        <h5 className='descr'>Description:</h5>
                        <p className='lett'>{games.description}</p>
                    </div>

                    <div className='cont-g'>
                        It's an{' '}
                        {!games.createdInDb
                        ? games.genres + ' '
                        : games.genres.map((e)=> e.name+ ' ')}
                        game ranked at {games.rating} points.
                    </div>
                    
                    <div className='cont-p'>
                        <p>Play it at {games.platforms}</p>
                    </div>

                    <Link to="/home">
                        <button className="botback" type="submit">🡸</button>
                    </Link>
                    
                    </div>
            
            
        
        )
    }

