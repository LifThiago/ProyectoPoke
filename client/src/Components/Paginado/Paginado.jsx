import React from 'react'
import './Paginado.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {

    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        // console.log(i)
        pageNumbers.push(i)
        // console.log(pageNumbers)
    }


  return (
    <nav className='pag_container'>
        {/* <ul className='pag_ul'>
            { pageNumbers && 
            pageNumbers.map(number =>{
                return (
                <li key={number} className='pag_numbs'>
                    <a onClick={() => paginado(number)} className='pag_numbs' >{number}</a>
                </li>
            )})}
        </ul> */}
        {pageNumbers && 
        pageNumbers.map(number =>{
            return(
                <button onClick={() => paginado(number)} className='pag_numbs' >{number}</button>
            )
        })}
    </nav>
  )
}
