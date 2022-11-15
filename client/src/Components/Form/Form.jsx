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
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
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
  if(input.attack.length === 0){
    errors.attack = 'Attack must be greater than 0'
  } else if(input.attack > 999){
    errors.attack = 'Attack must be less than 1000'
  }
  if(input.defense.length === 0){
    errors.defense = 'Defense must be greater than 0'
  } else if(input.defense > 999){
    errors.defense = 'Defense must be less than 1000'
  }
  if(input.speed.length === 0){
    errors.speed = 'Speed must be greater than 0'
  } else if(input.speed > 999){
    errors.speed = 'Speed must be less than 1000'
  }
  if(input.height.length === 0){
    errors.height = 'Height must be greater than 0'
  } else if(input.height > 25){
    errors.height = 'Height must be less than 25'
  }
  if(input.weight.length === 0){
    errors.weight = 'Weight must be greater than 0'
  } else if(input.weight > 5000){
    errors.weight = 'Weight must be less than 5000'
  }
  if(input.img.length === 0) {
    errors.img = 'You must enter an URL'
  } else if(validateUrl(input.img) !== true){
    errors.img = 'You must enter a valid image URL'
  }
  if(input.type.length === 0){
    errors.type = 'You must select at least 1 type'
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
    setErrors(
      validateForm({
        ...input,
        type: [...input.type, e.target.value]
      })
    )
    console.log(input)
  }

  const [errors, setErrors] = React.useState({})

  return (
    <form onSubmit={handleSubmit} >
      <label>Name: </label>
      <input name='name' value={input.name} onChange={handleInputChange} />
      {errors.name && <p>{errors.name}</p>}
      {/* <p style={{ visibility: errors.name ? "visible" : "hidden" }}>
            {errors.name}
          </p> */}
      <br />

      <label>HP: </label>
      <input name='hp' type="number" value={input.hp} onChange={handleInputChange} min={0} max={1000} />
      {errors.hp && <p>{errors.hp}</p>}
      <br />

      <label>Attack: </label>
      <input name='attack' type='number' value={input.attack} onChange={handleInputChange} />
      {errors.attack && <p>{errors.attack}</p>}
      <br />

      <label>Defense: </label>
      <input name='defense' type='number' value={input.defense} onChange={handleInputChange} />
      {errors.defense && <p>{errors.defense}</p>}
      <br />

      <label>Speed: </label>
      <input name='speed' type='number' value={input.speed} onChange={handleInputChange} />
      {errors.speed && <p>{errors.speed}</p>}
      <br />

      <label>Height: </label>
      <input name='height' type='number' value={input.height} onChange={handleInputChange} />
      {errors.height && <p>{errors.height}</p>}
      <br />

      <label>Weight: </label>
      <input name='weight' type='number' value={input.weight} onChange={handleInputChange} />
      {errors.weight && <p>{errors.weight}</p>}
      <br />

      <label>Image: </label>
      <input name='img' type='url' value={input.img} onChange={handleInputChange} />
      {errors.img && <p>{errors.img}</p>}
      <br />

      <label>Type: </label>
      {/* <div>
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
      </div> */}
      <br />

      <div>
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
      </div>
      {errors.type && <p>{errors.type}</p>}
      
      <button disabled={!input.name || Object.keys(errors).length > 0} onSubmit={handleSubmit} >Submit</button>
    </form>
  )
}
