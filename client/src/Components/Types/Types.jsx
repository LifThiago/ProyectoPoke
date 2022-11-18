import React from 'react'
import './Types.css'
import { capitalizeFirstLetter } from '../Form/controller'

export default function Types({types}) {

  return (
    <div>
      <h1 className='types_type' >TYPE</h1>
      <div className='types_div' >
      {types.map(t => {
        return(
          <h2 className={`${t} types_h2`} >{t.toUpperCase()}</h2>
        )
      })}
      </div>
    </div>
  )
}
