import React from 'react'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../Form/controller'
import Types from '../Types/Types'
import './Card.css'

export default function Card({name, img, types, id}) {
  return (
    <div className='card' >
        {/* <Link to={`/detail/${id}`} className='card_link' >{capitalizeFirstLetter(name)}</Link> */}
        <h1>{capitalizeFirstLetter(name)}</h1>
        {/* <h2>Types: {types.map(t => <p>{capitalizeFirstLetter(t)}</p>)}</h2> */}
        <Types types={types} ></Types>
        <img src={img} alt={name} className='card_img' />
    </div>
  )
}
