import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import LandingImage from '../assets/LandingImage.jpg'
import '../components/styles/LandingPage.css'




export default function LandingPage() {
  return (
    <div className='cont-img'>
        <img src={LandingImage} alt='landing' className='img-land'/>
        
            <Link to = '/home'>
                <button type= 'submit' className='button_home'>PRESS START</button>
            </Link>
        
    </div>
  )
}
