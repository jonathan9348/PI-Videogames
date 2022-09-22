import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../actions';
import '../components/styles/SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length === 0) alert('Debe escribir un nombre para buscar');
        else {
            dispatch(searchVideogames(name));
            setName('');
        }

    }
    return (
        <div>
            <div className='container'>
                <input
                    
                    value={name}
                    onChange={e => handleChange(e)}
                    placeholder='Search'
                    type='search'
                    className='sbinput' />
                <button className='btn' type='submit' onClick={e => handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )
}
