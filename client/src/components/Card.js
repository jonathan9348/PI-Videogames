import React from 'react';
import './styles/Card.css';


export default function card({name, image, genres, rating}) {

  
    
  return (
    
        <div className='cont-card'>
          <div className='card'>
          <h4>{name}</h4>
            <img className='card-img' src={image} alt='img not found' />
            <p>Género: {genres}</p>

          </div>
            
            
            
        </div>
    
  )
}
