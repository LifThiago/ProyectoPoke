import React from 'react'
import axios from "axios" //BORRAR

export default function Form() {

  const [input, setInput] = React.useState({
    name: ''
  })

  function handleInputChange(e) {
    setInput({
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit() {
    axios.post('http://localhost:3001/pokemons', input)
    .then(res => console.log(res.data))
    .catch(err => console.log('err'))
  }

  return (
    <div>
      <label>Nombre:</label>
      <input name='name' value={input.name} onChange={handleInputChange}/>
      <br />
      <button onClick={handleSubmit}></button>
    </div>
  )
}
