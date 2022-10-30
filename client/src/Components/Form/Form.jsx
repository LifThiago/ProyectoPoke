import React from 'react'
import axios from "axios" //BORRAR

export default function Form() {

  const [input, setInput] = React.useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    img: '',
    // type: []
  })

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit() {
    axios.post('http://localhost:3001/pokemons', input)
    .then(res => console.log(res.data))
    .catch(err => console.log('err'))
    setInput({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      img: '',
      // type: []
    })
  }

  return (
    <div>
      <label>Nombre: </label>
      <input name='name' value={input.name} onChange={handleInputChange}/>
      <br />
      <label>Vida: </label>
      <input name='hp' type="number" value={input.hp} onChange={handleInputChange}/>
      <br />
      {/* <label>Type: </label>
      <input name='type' type="array" value={input.type} onChange={handleInputChange}/> */}
      <button onClick={handleSubmit}></button>
    </div>
  )
}
