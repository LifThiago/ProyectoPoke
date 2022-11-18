import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import pokemonTeamOk from '../../Images/pokemonTeamOk.png'

export default function Landing() {
  return (
    <div className='landing_div' >
      <img src={pokemonTeamOk} className='landing_img' />
      {/* <img src={pokemonMap} className='landing_bg' /> */}
        <Link to='/home' className='landing_link' >Gotta catch 'em all </Link>
    </div>
  )
}
