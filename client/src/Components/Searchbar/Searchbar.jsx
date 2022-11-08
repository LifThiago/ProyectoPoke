import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchPokemon } from '../../Redux/actions'

export default function Searchbar() {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const pokemon = useSelector((state) => state.pokemon)

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name.length !== 0){
            dispatch(searchPokemon(name))
            console.log(pokemon)
        } else {
            alert('You must enter a name')
        }
        setName('')
    }

  return (
    <div>
        <form onSubmit={handleSubmit} />
        <input type='text' placeholder='Search in pokedex' value={name} onChange={handleChange} />
        <button type='submit' onClick={handleSubmit} >Search!</button>
    </div>
  )
}
