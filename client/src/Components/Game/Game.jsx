import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonById } from '../../Redux/actions'
import './Game.css'

export default function Game() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonById(Math.ceil(Math.random() * 150)))
    }, [dispatch])
    const pokemon = useSelector((state) => state.pokemon)
    const [name, setName] = useState('')
    const [memory, setMemory] = useState([])
    const [lives, setLives] = useState(3)

    function handleChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name === pokemon.name && name.length > 0){
            setName('')
            window.location.reload(true)
            setLives(3)
            setMemory([])
            throw alert('correct')
        } else {
            setLives(lives - 1)
            setMemory([...memory, name])
            setName('')
            throw alert('no')
        }
    }

    function handleNext(){
        window.location.reload(true)
    }

  return (
    <div className='game_container' >
        <div className="game_lives">
            <div className="game_hearts">
                <h1 className={lives < 1 ? 'lost' : 'live'} >Vida1</h1>
                <h1 className={lives < 2 ? 'lost' : 'live'} >Vida2</h1>
                <h1 className={lives < 3 ? 'lost' : 'live'} >Vida3</h1>
            </div>
        </div>

        <div className="game_game">
            <img src={pokemon.img} alt={pokemon.name} className='detail_img' />
            <label>GUESS THE POKEMON'S NAME</label>
            <input type='text' value={name} onChange={handleChange} />
            <button type='submit' onClick={handleSubmit} >Guess</button>
        </div>

        <h1>Errors: {memory.map(m => <p>{m}</p>)}</h1>
        <button type='submit' onClick={handleNext} >Next</button>
    </div>
  )
}
