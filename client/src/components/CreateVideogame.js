import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getGenres, createGame } from '../actions';
import validationPost from '../components/ValidationPost'


export default function createVideogame() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); //Aplicamos este hook en lugar de Link, para que cuando creemos el juego nos redirija a cierta ruta
    const genresSel = useSelector((state) => state.genres);
    const [error, setError] = useState();
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
    }, []);

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
        navigate('/home')
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
    <div>c</div>
  )
}
