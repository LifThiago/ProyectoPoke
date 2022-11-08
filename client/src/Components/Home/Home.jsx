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
  let filterPokemons = []
  // const pokemon = useSelector((state) => state.pokemon)
  console.log(allPokemons)
  // console.log(filterPokemons)

  function handleStore(e){
    console.log(e.target.value)
    if(e.target.value === 'inApi') {
      filterPokemons = allPokemons.filter(p => !p.createdDb)
      console.log(filterPokemons)
    } else if(e.target.value === 'inDb'){
      filterPokemons = allPokemons.filter(p => p.createdDb === true)
      console.log(filterPokemons)
    } else if(e.target.value === 'all') {
      filterPokemons = allPokemons
      console.log(filterPokemons)
    }
  }


  return (
    <div>Home

      <div>
        <label>Show pokemons in...</label>
        <select onChange={handleStore} >
          <option value='all' >All</option>
          <option value='inApi' >API</option>
          <option value='inDb' >DB</option>
        </select>
      </div>

      <div>
        {
          allPokemons.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            allPokemons.map(p => {
              return (
                <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
              )
            })
          )
        }
      </div>

      {/* <div>
        {
          pokemon.name !== undefined ? (
            <Card name={pokemon.name} img={pokemon.img} types={pokemon.types} id={pokemon.id} key={pokemon.id} />
          ) : (
            allPokemons.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              allPokemons.map(p => {
                return (
                  <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
                )
              })
            )
          )
        }
      </div> */}

    </div>
  )
}