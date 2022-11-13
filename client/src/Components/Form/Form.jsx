import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function validateString(string) {
  let check = /^[a-zA-Z\s]*$/;
  if(check.test(string)) {
    return true
  } else {
    return false
  }
}
function validateForm(input){
  let errors = {};
  if(validateString(input.name) !== true){
    errors.name = 'The name only accepts numbers'
  }
  if(!input.name) {
    errors.name = 'The pokemon must have a name'
  }
  if(input.hp.length === 0){
    errors.hp = 'HP must be greater than 0'
  } else if(input.hp > 999) {
    errors.hp = 'HP must be less than 1000'
  }
  return errors
}

export default function Form() {
  
  const history = useHistory()

  const [input, setInput] = React.useState({
    name: '',
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    img: '',
    type: []
  })
  // useEffect(() => {
  //     setErrors(
  //       validateForm(input)
  //     )
  // }, input)

  
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:3001/pokemons', input)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    setInput({
      name: '',
      hp: 1,
      attack: 1,
      defense: 1,
      speed: 1,
      height: 1,
      weight: 1,
      img: '',
      type: []
    })
    history.push('/home')
  }

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(
      validateForm({
      ...input,
      [e.target.name]: e.target.value
    })
    )
    console.log(input)
  }
  function handleSelect(e){
    setInput({
      ...input,
      type: [...input.type, e.target.value]
    })
    console.log(input)
  }

  const [errors, setErrors] = React.useState({})

  return (
    <form onSubmit={handleSubmit} >
      <label>Name: </label>
      <input name='name' value={input.name} onChange={handleInputChange} />
      {/* {errors.name && <p>{errors.name}</p>} */}
      <p style={{ visibility: errors.name ? "visible" : "hidden" }}>
            {errors.name}
          </p>
      <br />

      <label>HP: </label>
      <input name='hp' type="number" value={input.hp} onChange={handleInputChange} min={0} max={1000} />
      {errors.hp && <p>{errors.hp}</p>}
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
      {/* <input list='type' name='type' value={input.type} onChange={handleInputChange} />
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
      </datalist> */}
      <br />

      <label>Normal</label>
      <input type='checkbox' name='type' value='normal' onChange={handleSelect} />
      <label>Fighting</label>
      <input type='checkbox' name='type' value='fighting' onChange={handleSelect}/>
      <label>Flying</label>
      <input type='checkbox' name='type' value='flying' onChange={handleSelect}/>
      <label>Poison</label>
      <input type='checkbox' name='type' value='poison' onChange={handleSelect}/>
      <label>Ground</label>
      <input type='checkbox' name='type' value='ground' onChange={handleSelect}/>
      <label>Rock</label>
      <input type='checkbox' name='type' value='rock' onChange={handleSelect}/>
      <label>Bug</label>
      <input type='checkbox' name='type' value='bug' onChange={handleSelect}/>
      <label>Ghost</label>
      <input type='checkbox' name='type' value='ghost' onChange={handleSelect}/>
      <label>Steel</label>
      <input type='checkbox' name='type' value='steel' onChange={handleSelect}/>
      <label>Fire</label>
      <input type='checkbox' name='type' value='fire' onChange={handleSelect}/>
      <label>Water</label>
      <input type='checkbox' name='type' value='water' onChange={handleSelect}/>
      <label>Grass</label>
      <input type='checkbox' name='type' value='grass' onChange={handleSelect}/>
      

      {/* <button onClick={handleSubmit}>Submit</button> */}
      <button
          disabled={!input.name || Object.keys(errors).length > 0}
          onSubmit={handleSubmit}
        >
          Enviar
        </button>
    </form>
  )
}
