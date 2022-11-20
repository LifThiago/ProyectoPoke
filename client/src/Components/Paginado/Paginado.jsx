import React from 'react'
import './Paginado.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado, currentPage}) {

    const pageNumbers = []

    for(let i=1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){
        // console.log(i)
        pageNumbers.push(i)
        // console.log(pageNumbers)
    }

    function handleButton(e){
        if(e.target.name === 'prev'){
            paginado(currentPage - 1)
        } else {
            paginado(currentPage + 1)
        }
    }


  return (
    <nav className='pag_container'>
        {/* {console.log(currentPage)} */}
        <button className='prev_next' name='prev' onClick={handleButton} >Prev</button>
        {pageNumbers &&
        pageNumbers.map(number =>{
            return(
                <button onClick={() => paginado(number)} className={currentPage===number? 'pag_numbs current': 'pag_numbs'} >{number}</button>
            )
        })
    }
        <button className='prev_next' name='next' onClick={handleButton} >Next</button>
    </nav>
  )
}
