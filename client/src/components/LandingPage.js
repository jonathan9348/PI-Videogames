import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import LandingImage from '../assets/LandingImage.jpg'
import '../components/styles/LandingPage.css'




export default function LandingPage() {
  return (
    <div>
        <div>
            <h1>Bienvenidos a Videogames 4all</h1>
        </div>        
        <img src={LandingImage} alt=''/>
        <div className=''>
            <Link to = '/home'>
                <button type= 'submit' className='button_home'>Que comiece el juego</button>
            </Link>
        </div>
    </div>
  )
}
