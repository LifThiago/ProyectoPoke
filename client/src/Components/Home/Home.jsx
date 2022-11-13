import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { filterByStorage, getAllPokemons, sortByAttack, sortByName } from '../../Redux/actions'
import Card from '../Card/Card'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPokemons())
  }, [dispatch])
  const [order, setOrder] = useState('')

  const allPokemons = useSelector((state) => state.allPokemons)
  let filterPokemons = allPokemons
  // const pokemon = useSelector((state) => state.pokemon)
  console.log(allPokemons)
  // console.log(filterPokemons)


  function handleStore(e){
    dispatch(filterByStorage(e.target.value))
    setOrder(e.target.value)
  }
  function handleAttack(e){
    dispatch(sortByAttack(e.target.value))
    setOrder(e.target.value)
    console.log(e.target.value)
    console.log(allPokemons)
  }
  function handleName(e) {
    dispatch(sortByName(e.target.value))
    setOrder(e.target.value)
    console.log(allPokemons)
  }


  return (
    <div>Home
      <br/>
      <Link to='/create' >Create pokemon</Link>

      <div>
        <label>Show pokemons in...</label>
        <select onChange={handleStore} >
          <option value='all' >All</option>
          <option value='inApi' >API</option>
          <option value='inDb' >DB</option>
        </select>
      </div>

      <div>
        <label>Attack</label>
        <select onChange={handleAttack} >
          <option value='random' >Random</option>
          <option value='asc' >ASC</option>
          <option value='des' >DES</option>
        </select>
      </div>

      <div>
        <label>Name</label>
        <select onChange={handleName} >
          <option value='random' >Random</option>
          <option value='asc' >ASC</option>
          <option value='des' >DES</option>
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