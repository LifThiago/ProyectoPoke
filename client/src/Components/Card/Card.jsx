import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({name, img, types, id}) {
  return (
    <div>
        <Link to={`/detail/${id}`}>{name}</Link>
        <h2>{types}</h2>
        <img src={img} alt={name} />
    </div>
  )
}
