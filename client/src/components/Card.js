import React from 'react'

export default function Card({name, image, genres, rating}) {

    
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
