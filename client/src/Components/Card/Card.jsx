import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({name, img, types, id}) {
  return (
    <div className='card' >
        <Link to={`/detail/${id}`} className='card_link' >{name}</Link>
        {/* <h2 className='card_types' > Types: {types}</h2> */}
        <h2>Types: {types.map(t => <p>{t}</p>)}</h2>
        {/* {
          types.map(t => <h2>{t}</h2>)
        } */}
        <img src={img} alt={name} className='card_img' />
    </div>
  )
}
