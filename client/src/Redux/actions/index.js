import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID'

export function getAllPokemons() {
    return async function(dispatch){
        const allPokemons = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: allPokemons.data
        })
    }
}

export function getPokemonById(id){
    return async function(dispatch){
        const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_POKEMON_BY_ID,
            payload: pokemon.data
        })
    }
}