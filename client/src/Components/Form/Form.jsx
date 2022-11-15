import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getTypes } from '../../Redux/actions';
import { capitalizeFirstLetter, validateForm } from './controller';

export default function Form() {
  const dispatch = useDispatch()
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
  useEffect(() => {
      dispatch(getTypes())
  }, [dispatch])
  let allTypes = useSelector((state) => state.types)
  
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
    console.log(e.target.checked)
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
      <br />

      {/* Type con checkbox */}
      <div>
        {allTypes && allTypes.map(
          t => {
            return(
              <>
              <label>{capitalizeFirstLetter(t.name)}</label>
              <input type='checkbox' name='type' value={t.name} onChange={handleSelect} disabled={false} ></input>
              </>
            )
          }
        )}
      </div>

      {/* Type con option */}
      {/* <div>
        <select multiple onChange={handleSelect} >
          <option value='fire' name='type' >Fire</option>
          {allTypes && allTypes.map(t => {
            return (
              <option name='type' value={t.name} key={t.id} >{t.name}</option>
            )
          })}
        </select>
      </div> */}

      {errors.type && <p>{errors.type}</p>}
      
      <button disabled={!input.name || Object.keys(errors).length > 0} onSubmit={handleSubmit} >Submit</button>
    </form>
  )
}
