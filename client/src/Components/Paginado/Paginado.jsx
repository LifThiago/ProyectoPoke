import React from 'react'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {

    const pageNumbers = []

    for(let i=0; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        console.log(i)
        pageNumbers.push(i)
        console.log(pageNumbers)
    }


  return (
    <nav>
        <h1>hola</h1>
        <ul>
            { pageNumbers && 
            pageNumbers.map(number =>{
                return (
                <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                </li>
            )})}
        </ul>
    </nav>
  )
}
