import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';


import { useSelector, useDispatch} from 'react-redux';
import { getGenres, createGame } from '../actions';
import validationPost from '../components/ValidationPost';
import './styles/Create.css'



export default function VideogameCreate ()  {
    const dispatch=useDispatch()
    const history = useHistory();
  
    const genres=useSelector((state)=> state.genres)
    // console.log(genre)
    
    
    const [errors, setErrors] = useState({});
  
  
    const[game, setGame]=useState({
      name: "",
      description: "",
      image: "",
      released: "",
      rating: 0,
      genres: [],
      platforms: [],
      
     })
  
  
     const randomPlatforms = ["PC", "iOS", "Android", "macOS",  "PlayStation 4", "PlayStation 5", "Xbox", "PS Vita"]
  
    useEffect(()=>{
      dispatch(getGenres())
    },[dispatch]);
  
   
    
    function ChangeInput(e){
      setGame({
        ...game,
        [e.target.name]: e.target.value,
    });
  
    setErrors(
      validationPost({
        ...game,
        [e.target.name]: e.target.value,
      })
    );
}
  
  
  
  function handleCheck(e){
    if(e.target.checked){
        setGame({
             ...game,
             platforms:e.target.value
        })
    }
  }
  
  
  function   handleSelect(e){
    if(game.genres.includes(e.target.value)){
      alert("ya existe este genero")
    }else{
      setGame({
        ...game,
        genres:[...game.genres,e.target.value]
    })
   }
  }
  
  const handleDelete = (el) => {
    setGame({
      ...game,
      genres: game.genres.filter((g) => g !== el),
    });
  };
  
  
  
  
  function handleSubmit (e) {
    e.preventDefault();
  
    dispatch(createGame(game));
    e.target.reset();
    alert("Videogame created successfully!");
   
  
    setGame({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: 0,
        genres: [],
        platforms: [],
    });
  
    history.push("/home");
  };
    
    
    
    return (
      <div className="title">
    
    
      
      <h1 className='title-post'>Create Videogame!</h1>
   
       <form className="form-name" noValidate onSubmit={(e) => handleSubmit(e)}>
      <div>
          <div>
                <div className="">
              <div>
                  <label className='tit' >-Name-</label>
                  <input className='label-input' type="text" name="name" value={game.name} onChange={(e) => ChangeInput(e)}/>
                 {errors.name && <p className="errors">{errors.name}</p>}
              </div>
              <div>
                  <label className='tit'>-Description-</label>
                  <input
                  className='label-input'
                  type="text"
                  name="description"
                  value={game.description}
                  onChange={(e) => ChangeInput(e)}
                  />
                  {errors.description && <p className="errors">{errors.description}</p>}
              </div>
              <div>
                  <label className='tit'>-Released-</label>
                  <input
                  className='label-input'
                  type="date"
                  name="released"
                  value={game.released}
                  onChange={(e) => ChangeInput(e)}
                  />
                    {errors.released && <p className="errors">{errors.released}</p>}
              </div>
              <div>
                  <label className='tit'>-Rating-</label>
                  <input
                  className='label-input'
                  type="number"
                  name="rating"
                  value={game.rating}
                  onChange={(e) => ChangeInput(e)}
                  />
                  {errors.rating && <p className="errors">{errors.rating}</p>}
              </div>
          </div>
          <div className="imagediv">
              <label className='tit'>-Image URL-</label>
              <input
              className='label-input'
              type="text"
              name="image"
              value={game.image}
              onChange={(e) => ChangeInput(e)}
              ></input>
          </div>
      </div>
          
              <div className="checks">
                  <label className='tit'>-Genres-</label>
                  <div className="gendivs">
                      <select className='label-input' onChange={(e)=> handleSelect(e)}>
                      
                        {genres.map((g)=>(
                          
                          <option value={g.name} key={g.id}>{g.name}</option>
                        ))}
                     </select>
                     
                     <ul><li>{game.genres.map(el=>el + ",")}</li></ul>
                  </div>
              </div>
               <div className="checks">
                  <label className='tit'>-Platforms-</label>
                  <div className='cont-plat'>
                  <div className='tit'>
                      {randomPlatforms.map((P) => (
                      <div key={P}>
                          <input
                          type="checkbox"
                          name="platforms"
                          value={P}
                          onChange={(e)=> handleCheck(e)}
                          ></input>
                          <label name={P}>{P}</label>
                      </div>
                      ))}
                  </div>
                  </div>
              </div> 
           
          <button className="btn-post" type="submit">
              Create
          </button>
      </div>
  </form>

  <Link to="/home">
        <button className='btn-back'>Volver</button>
    </Link>
      </div>
      )
  }