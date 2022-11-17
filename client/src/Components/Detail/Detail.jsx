import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPokemons, getPokemonById } from '../../Redux/actions'
import { capitalizeFirstLetter } from '../Form/controller'
import './Detail.css'

export default function Detail(props) {
    console.log(props.match.params)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonById(props.match.params.id))
    }, [dispatch])
    const pokemon = useSelector((state) => state.pokemon)
    console.log(pokemon)

  return (
    <div className='detail_total'>
      <div className="detail_container">

      <div className='detail_right' >
        <h1 className='detail_name' >{pokemon.name}</h1>
        <img src={pokemon.img} alt={pokemon.name} className='detail_img' />
      </div>

      <div className="detail_left">
        <div className="detail_div">
          <h5 className='detail_always' >ID</h5>
          <h5 className='detail_info' >{pokemon.id}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >ATTACK</h5>
          <h5 className='detail_info' >{pokemon.attack}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >DEFENSE</h5>
          <h5 className='detail_info' >{pokemon.defense}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >SPEED</h5>
          <h5 className='detail_info' >{pokemon.speed}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >HP</h5>
          <h5 className='detail_info' >{pokemon.hp}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >HEIGHT</h5>
          <h5 className='detail_info' >{pokemon.height}</h5>
        </div>
        <div className="detail_div">
          <h5 className='detail_always' >WEIGHT</h5>
          <h5 className='detail_info' >{pokemon.weight}</h5>
        </div>
        <div className="detail_div">
        <h5 className='detail_always'>TYPE</h5>
        <h5 className='detail_info'>{pokemon.type && pokemon.type.map(t => {
          return(
            `${capitalizeFirstLetter(t)} `
          )
        })} </h5>
        </div>
      </div>
      </div>
      <Link to='/home' className='detail_button' >GO BACK</Link>
    </div>
  )
}
