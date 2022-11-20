import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getTypes } from '../../Redux/actions';
import { capitalizeFirstLetter, validateForm } from './controller';
import './Form.css'

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
    throw alert('Pokemon created succesfully')
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

  // function handleSelect(e){
  //     setInput({
  //       ...input,
  //       type: [...input.type, e.target.value]
  //     })
  //     setErrors(
  //       validateForm({
  //         ...input,
  //         type: [...input.type, e.target.value]
  //       })
  //     ) 
  // }

  function handleCheck(e){
    let checked = e.target.checked
    if(checked){
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
    }
    if(!checked){
      setInput({
        ...input,
        type: input.type.filter((t) => t !== e.target.value)
      })
      setErrors(
        validateForm({
          ...input,
          type: input.type.filter((t) => t !== e.target.value)
        })
      )
    }
    console.log(input)
  }

  function handleRefresh(e){
    e.preventDefault()
    setInput({
      ...input,
      type: []
    })
    setErrors(
      validateForm({
        ...input,
        type: []
      })
    )
  }

  const [errors, setErrors] = React.useState({})

  return (
  <form onSubmit={handleSubmit} className='form_container' >
    <div className='form_div'>
      <div className={errors.name ? 'form_options options_error' : 'form_options'}>
        <label className='label'>NAME:</label>
        <input name='name' value={input.name} onChange={handleInputChange} placeholder="Pokemon's name" className={errors.name ? 'input disable' : 'input'} />
        {errors.name && <p className='error' >{errors.name}</p>}
      </div>
      <br />

      <div className={errors.hp ? 'form_options options_error' : 'form_options'}>
        <label className='label'>LIFE:</label>
        <input name='hp' type="number" value={input.hp} onChange={handleInputChange} min={0} max={1000} className={errors.hp ? 'input disable' : 'input'} />
        {errors.hp && <p className='error' >{errors.hp}</p>}
      </div>
      <br />

      <div className={errors.attack ? 'form_options options_error' : 'form_options'}>
        <label className='label'>ATTACK:</label>
        <input name='attack' type='number' value={input.attack} onChange={handleInputChange} className={errors.attack ? 'input disable' : 'input'} />
        {errors.attack && <p className='error' >{errors.attack}</p>}
      </div>
      <br />
    </div>

    <div className='form_div'>
      <div className={errors.defense ? 'form_options options_error' : 'form_options'}>
        <label className='label'>DEFENSE:</label>
        <input name='defense' type='number' value={input.defense} onChange={handleInputChange} className={errors.defense ? 'input disable' : 'input'} />
        {errors.defense && <p className='error' >{errors.defense}</p>}
      </div>
      <br />

      <div className={errors.speed ? 'form_options options_error' : 'form_options'}>
        <label className='label'>SPEED:</label>
        <input name='speed' type='number' value={input.speed} onChange={handleInputChange} className={errors.speed ? 'input disable' : 'input'} />
        {errors.speed && <p className='error' >{errors.speed}</p>}
      </div>
      <br />

      <div className={errors.height ? 'form_options options_error' : 'form_options'}>
        <label className='label'>HEIGHT: </label>
        <input name='height' type='number' value={input.height} onChange={handleInputChange} className={errors.height ? 'input disable' : 'input'} />
        {errors.height && <p>{errors.height}</p>}
      </div>
      <br />
    </div>

    <div className="form_div">
      <div className={errors.weight ? 'form_options options_error' : 'form_options'}>
      <label className='label'>WEIGHT: </label>
      <input name='weight' type='number' value={input.weight} onChange={handleInputChange} className={errors.weight ? 'input disable' : 'input'} />
      {errors.weight && <p className='error' >{errors.weight}</p>}
      </div>
      <br />

      <div className={errors.img ? 'form_options options_error' : 'form_options'}>
        <label className='label'>IMAGE: </label>
        <input name='img' type='url' value={input.img} onChange={handleInputChange} placeholder="Pokemon's image" className={errors.img ? 'input disable' : 'input input_img'} />
        {errors.img && <p className='error' >{errors.img}</p>}
      </div>
      <br />
    </div>

    <div className={errors.type ? 'form_options options_error form_type form_type_errors' : 'form_options form_type'}>
      <label className='label'>TYPE: </label>
      {/* Type con checkbox */}
      <div className='form_checkboxes'>
        {allTypes && allTypes.map(
          t => {
            return(
              <div className='form_checkbox'>
              <label className='label' for={t.name}>{capitalizeFirstLetter(t.name)}</label>
              <input type='checkbox' name={t.name} value={t.name} onChange={handleCheck} className='form_checks' ></input>
              </div>
            )
          }
        )}
      </div>
      {errors.type && <p className='error'>{errors.type}</p>}
    </div>
      
    <div className="form_buttons">
      <button disabled={!input.name || Object.keys(errors).length > 0} onSubmit={handleSubmit} className='form_button' >Submit</button>
      <Link to='/home' className='link_back' >
        <button className='form_back'>Go back</button>
      </Link>
    </div>
    </form>
  )
}
