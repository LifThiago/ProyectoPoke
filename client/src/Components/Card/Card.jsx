import React from 'react'
import { Link } from 'react-router-dom'
import { capitalizeFirstLetter } from '../Form/controller'
import Types from '../Types/Types'
import './Card.css'

export default function Card({name, img, types, id}) {
  return (
    <div className='card' >
      <div className='card_upper' >
        {/* <h1 className='card_name' >{capitalizeFirstLetter(name)}</h1> */}
        <h1 className='card_name' >{name.toUpperCase()}</h1>
        <img src={img} alt={name} className='card_img' />
      </div>
      <div className='card_type' >
        <Types types={types} ></Types>
      </div>
    </div>
  )
}
