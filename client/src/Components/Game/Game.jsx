import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, MemoryRouter } from 'react-router-dom'
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

    var element = document.getElementById('game')

    function handleSubmit(e){
        e.preventDefault()
        if(name === pokemon.name && name.length > 0){
            setName('')
            window.location.reload(true)
            setLives(3)
            setMemory([])
            throw alert('Congratulations, you guessed correctly')
        } else {
            element.classList.toggle('game_game_animate')
            if(lives - 1 === 0){
                setLives(lives - 1)
                setMemory([...memory, name])
                setName('')
                window.location.reload(true)
                throw alert(`You lost, the correct name was ${pokemon.name}`)
            }
            setLives(lives - 1)
            setMemory([...memory, name])
            setName('')
            setTimeout(() => {
                element.classList.toggle('game_game_animate')
            }, 600);
        }
    }

    function handleNext(){
        window.location.reload(true)
    }

  return (
    <div className='game_container' >
        <div className="game_lives">
            <div className="game_hearts">
                <h1 className={lives < 1 ? 'lost' : 'live'} >Life 1</h1>
                <h1 className={lives < 2 ? 'lost' : 'live'} >Life 2</h1>
                <h1 className={lives < 3 ? 'lost' : 'live'} >Life 3</h1>
            </div>
        </div>

        <div className='game_game' id='game'>
            <img src={pokemon.img} alt={pokemon.name} className='game_img' />
            <form type='submit' onSubmit={handleSubmit} className='game_form' >    
                {/* <label>GUESS THE POKEMON'S NAME</label> */}
                <input type='text' value={name} onChange={handleChange} placeholder='Guess the name' className='game_input' />
                <button type='submit' onClick={handleSubmit} className='game_button' >Guess</button>
            </form>
            <p className={memory.length > 0 ? 'game_errors' : 'game_errors_hidden'} >{memory.map(m => <p>{m.toUpperCase()}</p>)}</p>

            <div className="game_bottom">
                <Link to='/home' className='game_link game_skip' id='button' >GO BACK</Link>
                <button type='submit' onClick={handleNext} className='game_skip' >SKIP</button>
            </div>
        </div>

    </div>
  )
}
