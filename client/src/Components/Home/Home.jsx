import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { sortByStorage, getAllPokemons, getTypes, sortByAttack, sortByName, sortByType } from '../../Redux/actions'
import Card from '../Card/Card'
import { capitalizeFirstLetter } from '../Form/controller'
import Paginado from '../Paginado/Paginado'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPokemons())
    dispatch(getTypes())
  }, [dispatch])
  const [order, setOrder] = useState('')
  const allPokemons = useSelector((state) => state.allPokemons)
  const allTypes = useSelector((state) => state.types)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage  // 12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage  // 0
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  console.log(allPokemons)

  function handleStore(e){
    dispatch(sortByStorage(e.target.value))
    setOrder(e.target.value)
  }
  function handleAttack(e){
    dispatch(sortByAttack(e.target.value))
    setOrder(e.target.value)
    console.log(allPokemons)
  }
  function handleName(e) {
    dispatch(sortByName(e.target.value))
    setOrder(e.target.value)
    console.log(allPokemons)
  }
  async function handleTypes(e){
    if(types.length < 20){
      dispatch(getTypes())
    }
    dispatch(sortByType(e.target.value))
    setOrder(e.target.value)
    console.log(allPokemons)
  }
  let types = useSelector((state) => state.types)


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
        <label>Type</label>
        <select onChange={handleTypes} >
          <option value='none' >None</option>
          {allTypes && 
          allTypes.map(t => {
            return (
              <option key={t.id} value={t.name} >{capitalizeFirstLetter(t.name)}</option>
            )
          })}
        </select>
      </div>

      <Paginado
      pokemonsPerPage={pokemonsPerPage}
      allPokemons={allPokemons.length}
      paginado={paginado}
      />
      
      {/* <div>
        {
          allPokemons.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            allPokemons.map(p => {
              return (
                <Link to={`/detail/${p.id}`} >
                  <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
                </Link>
              )
            })
          )
        }
      </div> */}
      <div>
        {currentPokemons?.map(p => {
          return (
            <div>
              <Link to={`/detail/${p.id}`} >
                  <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
                </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}