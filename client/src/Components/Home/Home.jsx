import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { sortByStorage, getAllPokemons, getTypes, sortByAttack, sortByName, sortByType } from '../../Redux/actions'
import Card from '../Card/Card'
import { capitalizeFirstLetter } from '../Form/controller'
import Paginado from '../Paginado/Paginado'
import './Home.css'
import pokemonMap from '../../Images/pokemonMap.png'

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
    <div className='home_container'>
      {/* <img src={pokemonMap} className='home_bg' /> */}
      <br/>
    <div className='home_functions'>

      <Link to='/create' className='home_link'><h5 className='home_create' >CREATE POKEMON</h5></Link>

    <div className="home_options">
      <div className='options'>
        <label className='label'>SHOW POKEMONS</label>
        <select onChange={handleStore} className='select' >
          <option value='all' >All</option>
          <option value='inApi' >Existing</option>
          <option value='inDb' >Created</option>
        </select>
      </div>

      <div className='options'>
        <label className='label' >ATTACK</label>
        <select onChange={handleAttack} className='select' >
          <option value='random' >Random</option>
          <option value='asc' >More powerful</option>
          <option value='des' >Less powerful</option>
        </select>
      </div>

      <div className='options'>
        <label className='label'>NAME</label>
        <select onChange={handleName} className='select' >
          <option value='random' >Random</option>
          <option value='asc' >A-Z</option>
          <option value='des' >Z-A</option>
        </select>
      </div>

      <div className='options'>
        <label className='label'>TYPE</label>
        <select onChange={handleTypes} className='select' >
          <option value='none' >All</option>
          {allTypes && 
          allTypes.map(t => {
            return (
              <option key={t.id} value={t.name} >{capitalizeFirstLetter(t.name)}</option>
            )
          })}
        </select>
      </div>
    </div>

      <Paginado
      pokemonsPerPage={pokemonsPerPage}
      allPokemons={allPokemons.length}
      paginado={paginado}
      className='home_paginado'
      />
    </div>
      
      <div className='home_pokemons' >
        {currentPokemons?.map(p => {
          return (
            <div>
              <Link to={`/detail/${p.id}`} className='home_cards' >
                  <Card name={p.name} img={p.img} types={p.type} key={p.id} id={p.id} />
                </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}