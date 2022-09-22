
import React from 'react'
import '../components/styles/Paginado.css'

export default function Paginado({allVideogames, videogamesPerPage, setPagination, actualPage }) {
    
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){ //Math.ceil devuelve el númer entero mayor o igual mas proximo de un número dado.
        pageNumber.push(i);
    }
  return (
    <nav>
        <div className='grid-container'> 
            
            {allVideogames < 15 ? //si no hay más de 15 items la paginación no se mostrará
            <div> {setPagination(1)} </div> :
             pageNumber && pageNumber.map(n =>( //si hay algo en pageNumber mapearlo
                <button onClick={() => setPagination(n)} className= {actualPage === n ? 'active items letters' : 'items letters'}>
                    {n}
                </button>
             ))
            }
        </div>
    </nav>
  )
}
