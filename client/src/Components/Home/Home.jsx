import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons } from '../../Redux/actions'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPokemons())
  }, [dispatch])
  const pokemons = useSelector((state) => state.pokemons)
  console.log(pokemons)

  return (
    <div>Home
      <ul>
        {pokemons.map(p => <li>{p.name}</li>)}
      </ul>
    </div>
  )
}
