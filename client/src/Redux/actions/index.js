import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';

export function getAllPokemons() {
    return async function(dispatch){
        const allPokemons = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: allPokemons.data
        })
    }
}