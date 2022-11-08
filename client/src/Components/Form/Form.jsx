import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function Form() {
  const history = useHistory()

  const [input, setInput] = React.useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    img: '',
    type: ''
  })

  
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:3001/pokemons', input)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    setInput({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      img: '',
      type: ''
    })
    history.push('/home')
  }

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  return (
    <form>
      <label>Name: </label>
      <input name='name' value={input.name} onChange={handleInputChange} />
      <br />

      <label>HP: </label>
      <input name='hp' type="number" value={input.hp} onChange={handleInputChange} />
      <br />

      <label>Attack: </label>
      <input name='attack' type='number' value={input.attack} onChange={handleInputChange} />
      <br />

      <label>Defense: </label>
      <input name='defense' type='number' value={input.defense} onChange={handleInputChange} />
      <br />

      <label>Speed: </label>
      <input name='speed' type='number' value={input.speed} onChange={handleInputChange} />
      <br />

      <label>Height: </label>
      <input name='height' type='number' value={input.height} onChange={handleInputChange} />
      <br />

      <label>Weight: </label>
      <input name='weight' type='number' value={input.weight} onChange={handleInputChange} />
      <br />

      <label>Image: </label>
      <input name='img' type='url' value={input.img} onChange={handleInputChange} />
      <br />

      <label>Type: </label>
      {/* <input list='weight' name='weight' value={input.weight} onChange={handleInputChange} /> */}
      <input list='type' name='type' value={input.type} onChange={handleInputChange} />
      <datalist id="type">
        <option value="normal" />
        <option value="fighting" />
        <option value="flying" />
        <option value="poison" />
        <option value="ground" />
        <option value="rock" />
        <option value="bug" />
        <option value="ghost" />
        <option value="steel" />
        <option value="fire" />
        <option value="water" />
        <option value="grass" />
        <option value="electric" />
        <option value="psychic" />
        <option value="ice" />
        <option value="dragon" />
        <option value="dark" />
        <option value="fairy" />
        <option value="unknown" />
        <option value="shadow" />
      </datalist>
      

      <button onClick={handleSubmit}></button>
    </form>
  )
}
