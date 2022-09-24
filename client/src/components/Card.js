import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function card({name, image, genres, rating}) {

    
  return (
    <div className='container'>
        <div className='card'>
            <h4>{name}</h4>
            <img className='imagen' src={image} alt='img not found' width= '300px' height= '250px'/>
            <p>Género: {genres}</p>
            <span>{rating}</span>
            
        </div>
    </div>
  )
}
