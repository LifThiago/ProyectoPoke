import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { searchPokemon } from '../../Redux/actions'
import './Searchbar.css'

export default function Searchbar() {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const history = useHistory()

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name.length !== 0){
            dispatch(searchPokemon(name))
            history.push(`/detail/${name}`)
        } else {
            alert('You must enter a name')
        }
        setName('')
    }

  return (
    <div className='nav_container' >
        <Link to='/' className='nav_link' >HENRYCHU</Link>
        <div className="nav_search">
            <form onSubmit={handleSubmit} />
            <input type='text' placeholder='Search in Pokedex' value={name} onChange={handleChange} className='nav_input'/>
            <button type='submit' onClick={handleSubmit} className='nav_button' >Go</button>
        </div>
    </div>
  )
}
