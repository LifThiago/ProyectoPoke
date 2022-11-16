import React from 'react'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../Form/controller'
import Types from '../Types/Types'
import './Card.css'

export default function Card({name, img, types, id}) {
  return (
    <div className='card' >
        <h1>{capitalizeFirstLetter(name)}</h1>
        <img src={img} alt={name} className='card_img' />
        <Types types={types} className='type'></Types>
    </div>
  )
}
