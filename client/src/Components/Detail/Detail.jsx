import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons, getPokemonById } from '../../Redux/actions'
import { capitalizeFirstLetter } from '../Form/controller'

export default function Detail(props) {
    console.log(props.match.params)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonById(props.match.params.id))
    }, [dispatch])
    const pokemon = useSelector((state) => state.pokemon)
    console.log(pokemon)

  return (
    <div>
        <h1>Name: {pokemon.name}</h1>
        <img src={pokemon.img} alt={pokemon.name} />
        <h5>Id: {pokemon.id}</h5>
        <h5>Attack: {pokemon.attack}</h5>
        <h5>Defense: {pokemon.defense}</h5>
        <h5>Speed: {pokemon.speed}</h5>
        <h5>Hp: {pokemon.hp}</h5>
        <h5>Height: {pokemon.height}</h5>
        <h5>Weight: {pokemon.weight}</h5>
        <h5>Types: {pokemon.type && pokemon.type.map(t => {
          return(
            <p>{capitalizeFirstLetter(t)}</p>
          )
        })}</h5>
    </div>
  )
}
