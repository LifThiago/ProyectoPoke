import React from 'react'
import { Link } from 'react-router-dom'
// import './Landing.css'
import './LandingOK.css'
import venusaurGrande from '../../Images/venusaurGrande.png'

export default function Landing() {
  return (
  <div className='landing'>
    <div className="landing_div">
      {/* <div className="landing_text"> */}
      <h1 className='landing_welcome' >Welcome to my Pokédex</h1>
      <Link to='/home' className='landing_link'>GOTTA CATCH 'EM ALL</Link>
      {/* <Link to='/home' className='landing_link'>Gotta catch 'em all</Link> */}
      {/* </div> */}
      {/* <Link to='/home' className='landing_link'>GOTTA CATCH 'EM ALL</Link> */}
    </div>
  </div>
  )
}
