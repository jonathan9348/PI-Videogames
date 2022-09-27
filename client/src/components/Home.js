import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterDb, getGenres, filterGenres, alfOrder, ratingOrder } from '../actions';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Paginado from '../components/Paginado';
import SearchBar from '../components/SearchBar';
import '../components/styles/Home.css';

export default function Home() {

  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);
  const videojuegos = useSelector((state) => state.videogames);
  //paginado
  const [actualPage, setActualPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const ultimo = actualPage * videogamesPerPage; // 1 * 15 =15
  const primero = ultimo - videogamesPerPage; // 15 - 15 = 0
  const videog = videojuegos.slice(primero, ultimo); // 0, 15

  //orden
  const [order, setOrder] = useState('');
  const [orderRating, setOrderRating] = useState('');

  const setPagination = (page) => {
    return setActualPage(page);
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]); //lo que esta dentro del useEffect se ejecutará cada vez que haya un cambio en el dispatch

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterGenres(e) {
    e.preventDefault();
    dispatch(filterGenres(e.target.value));
  }

  function handleFilterPost(e) {
    dispatch(filterDb(e.target.value));
    setOrder(e.target.value);
  }

  function handlesortAlf(e) {
    e.preventDefault();
    dispatch(alfOrder(e.target.value))
    setOrder(`Order ${e.target.value}`);//setea el estado local para tomar los cambios y renderizar
  }

  function handlesortRatg(e) {
    e.preventDefault();
    dispatch(ratingOrder(e.target.value))
    setOrderRating(`Order ${e.target.value}`);
  }

  return (
    <div className='cont1'>
      <div className='cont2'>
        <div>
          <button className='btn-1' onClick={(e) => {handleClick(e)}}>
            Cargar videojuegos 
          </button>
        </div>
        <div>
          <Link to='/videogame'>
            <button className='btn-post'>Agregar videojuego nuevo</button>
          </Link>
        </div>
        <div>
          <SearchBar/>
        </div>
        <div className='filter'>
          <div>
            <div>Filtar por Géneros</div>
            <select className='sbFilter' onChange={(e) => handleFilterGenres(e)}>
              <option value='All' default>Todos</option>
              {generos.map((e) => (
                <option value={e.name} key={e.id}>{e.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div>Ordenar Alfabeticamente</div>
            <select className='sbFilter' onChange={(e) => handlesortAlf(e)}>
              <option value='All' default>Todos</option>
              <option value='asc_name'>alfabeticamente (A-Z)</option>
              <option value='des_name'>alfabeticamente (Z-A)</option>
            </select>

          </div>

          <div>
            <div>Ordenar por Rating</div>
            <select className='sbFilter' onChange={(e) => handlesortRatg(e)}>
              <option value='All' default>Todos</option>
              <option value='rating_des'>Rating (Menor - Mayor)</option>
              <option value='rating_asc'>Rating (Mayor - Menor)</option>
            </select>

          </div>
          <div>
            <div>Filtrar por Juego Creado/Existente</div>
            <select className='sbFilter' onChange={(e) => handleFilterPost(e)}>
              <option value='All' default>Todos</option>
              <option value='Api'>Juegos en la Api</option>
              <option value='Created'>Juegos agregados por el usuario</option>
            </select>
          </div>

        </div>
      </div>
      <h1>Welcome to Home</h1>
            
      <div className='layout'>
        {videog?.map((e) => {
          return (
              <div key={e.id}>
                <Link to={'/home/' + e.id}>
                  <Card
                    key={e.id}
                    name={e.name}
                    image={e.image}
                    genres={e.genres}
                    rating={e.rating} 
                    
                  />
                </Link>
              </div>
          );
        })};
      </div>
      <div>
       { <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={videojuegos.length}
          setPagination={setPagination}
          actualPage={actualPage}
        />}
      </div>

    </div>
  )
}
