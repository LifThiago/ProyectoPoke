import React from 'react'
import './Types.css'
import { capitalizeFirstLetter } from '../Form/controller'

export default function Types({types}) {

function renderSwitch(type){
  switch (type) {
    case 'normal':
      return 'Normal'
      break;

    case 'fighting':
      return 'Fighting'
      break;

    case 'flying':
      return 'Flying'
      break;

    case 'poison':
      return 'Poison'
      break;

    case 'ground':
      return 'Ground'
      break;

    case 'rock':
      return 'Rock'
      break;

    case 'bug':
      return 'Bug'
      break;

    case 'ghost':
      return 'Ghost'
      break;

    case 'steel':
      return 'Steel'
      break;

    case 'fire':
      return 'Fire'
      break;

    case 'water':
      return 'Water'
      break;

    case 'grass':
      return 'Grass'
      break;

    case 'electric':
      return 'Electric'
      break;

    case 'psychic':
      return 'Psychic'
      break;

    case 'ice':
      return 'Ice'
      break;

    case 'dragon':
      return 'Dragon'
      break;

    case 'dark':
      return 'Dark'
      break;

    case 'fairy':
      return 'Fairy'
      break;

    case 'unknown':
      return 'Unknown'
      break;

    case 'shadow':
      return 'Shadow'
      break;
  
    default:
      return 'default'
  }
}

  return (
    <div>
      <h1 className='types_type' >TYPE</h1>
      <div className='types_div' >
      {types.map(t => {
        return(
          <h2 className={t} >{t.toUpperCase()}</h2>
        )
      })}
      </div>
    </div>
  )
}