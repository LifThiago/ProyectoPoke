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

      <div>
        {allTypes && allTypes.map(
          t => {
            return(
              <>
              <label>{capitalizeFirstLetter(t.name)}</label>
              <input type='checkbox' name='type' value={t.name} onChange={handleSelect} ></input>
              </>
            )
          }
        )}
      </div>

      {/* <div>
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
      <label>Electric</label>
      <input type='checkbox' name='type' value='electric' onChange={handleSelect}/>
      <label>Electric</label>
      <input type='checkbox' name='type' value='electric' onChange={handleSelect}/>
      <label>Psychic</label>
      <input type='checkbox' name='type' value='psychic' onChange={handleSelect}/>
      <label>Ice</label>
      <input type='checkbox' name='type' value='ice' onChange={handleSelect}/>
      <label>Dragon</label>
      <input type='checkbox' name='type' value='dragon' onChange={handleSelect}/>
      <label>Dark</label>
      <input type='checkbox' name='type' value='dark' onChange={handleSelect}/>
      <label>Fairy</label>
      <input type='checkbox' name='type' value='fairy' onChange={handleSelect}/>
      <label>Unknown</label>
      <input type='checkbox' name='type' value='unknown' onChange={handleSelect}/>
      <label>Shadow</label>
      <input type='checkbox' name='type' value='shadow' onChange={handleSelect}/>
      </div> */}

      {/* <select>
        <option value='none' >None</option>
        {allTypes.length && allTypes.map((e) => {
          return (
            <option key={e.id} name={e.name} >{capitalizeFirstLetter(e.name)}</option>
          )
        })}
      </select> */}

      {errors.type && <p>{errors.type}</p>}
      
      <button disabled={!input.name || Object.keys(errors).length > 0} onSubmit={handleSubmit} >Submit</button>
    </form>
  )
}
