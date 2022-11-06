import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllPokemons } from '../../Redux/actions'
import Card from '../Card/Card'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPokemons())
  }, [dispatch])

  const allPokemons = useSelector((state) => state.allPokemons)
  console.log(allPokemons)

  return (
    <div>Home
      <div>
        {
          allPokemons.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            allPokemons.map(p => {
              return (
                <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
                // <h3>{p.name}</h3>
              )
            })
          )
        }
      </div>
    </div>
  )
}
