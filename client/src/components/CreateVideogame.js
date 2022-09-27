import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';


import { useSelector, useDispatch} from 'react-redux';
import { getGenres, createGame } from '../actions';
import validationPost from '../components/ValidationPost'



export default function CreateVideogame() {

    const dispatch = useDispatch();
    const history = useHistory(); //Aplicamos este hook en lugar de Link, para que cuando creemos el juego nos redirija a cierta ruta
    const genresSel = useSelector((state) => state.genres);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name: '',
        background_image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    });

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    function handleChange(e){
        setInput((input) =>{
            const newInput = {
                ...input,
                [e.target.name]:[e.target.value]
            }
            const error = validationPost(newInput)
            setError(error)
            return newInput;
        })
    };

    function handlePlatform(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setError(validationPost({
            ...input,
            [e.target.name]:[e.target.value]
        }))
    }

    function handleGenre(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createGame(input))
        alert('Videogame created')
        setInput({
            name: '',
        background_image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
        })
        history.push('/home')
    }

    function handleDeletePlat(platform){
        setInput({
            ...input,
            platforms: input.platforms.filter((p) => p !==platform)
        })
    }

    function handleDeleteGen(genre){
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !==genre )
        })
    }

    function checkProperties(obj){
        for (let key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return false;
        }
        return true;
    }
  return (
    <div>
        <Link to='/home'>
            <button>Back</button>
        </Link>
        <div>
            <form onSubmit={e => handleSubmit(e)} >
                <h1>New Videogame</h1>
                <div>
                    <label htmlFor='input'>Name</label><i></i>
                    <input type='text' value={input.name} required='required' name='name' onChange={e => handleChange(e)}/>
                    {error.name ? (<p>{error.name}</p>) : null}
                </div>
                
                <div>
                    <label htmlFor='input'>Imagen Link</label><i placeholder=''></i>
                    <input type='text' value={input.background_image} required='required' name='background_image' onChange={e => handleChange(e)}/>
                    {error.background_image ? (<p>{error.background_image}</p>) : null}
                </div>
                
                <div>
                    <label htmlFor='input'>Description</label><i></i>
                    <input type='text' value={input.description} required='required' name='description' onChange={e => handleChange(e)}/>
                    {error.description ? (<p>{error.description}</p>) : null}
                </div>
                
                <div>
                    <label htmlFor='input'>Rating</label><i></i>
                    <input type='number' value={input.rating} required='required' name='rating' onChange={e => handleChange(e)}/>
                    {error.rating ? (<p>{error.rating}</p>) : null}
                </div>
                
                <div>
                    <label htmlFor='select'>Release Data</label><i></i>
                    <input type='date' value={input.released} required='required' name='released' onChange={e => handleChange(e)}/>
                    {error.released ? (<p>{error.released}</p>) : null}
                </div>

                <div>
                <label htmlFor='select'>Platforms</label><i></i>
                <select onChange={e => handlePlatform(e)}>
                    <option hidden>Select</option>
                    <option value='PC'>PC</option>
                    <option value='Playstation 4'>Playstation 4</option>
                    <option value='Playstation 5'>Playstation 5</option>
                    <option value='Xbox One'>Xbox One</option>
                    <option value='Xbox Series S/X'>Xbox Series S/X</option>
                    <option value='Nintendo Switch'>Nintendo Switch</option>
                </select>
                {input.platforms.map((p) =>
                <div key={p}>
                    <p>{p}</p><button onClick={() => handleDeletePlat(p)}>X</button>
                </div>
            )}
            </div>

            <div>
            <label htmlFor='select'>Genres</label><i></i>
            <select onChange={handleGenre}>
                <option hidden>Select</option>
                {genresSel.map((g) => (
                    <option key={g.id} id={g.id} value={g.name}>{g.name}</option>
                ))}
            </select>
            {input.genres.map((g) =>
            <div key={g}>
                <p>{g}</p>
                <button onClick={() => handleDeleteGen(g)}>X</button>
            </div>
        )}
        </div>

        <div>
            {(!Object.keys(error).length && !checkProperties(input))
            ? (<button type='submit'><span>Create</span></button>)
            : <button disabled type='submit'><span>Create</span></button>}
        </div>

            </form>
        </div>
    </div>
  )
}
