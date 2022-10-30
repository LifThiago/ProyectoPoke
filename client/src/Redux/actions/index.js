import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';

export function getAllPokemons() {
    return function(dispatch){
        return axios('http://localhost:3001/pokemons')
        .then(res => res.data)
        .then(obj => dispatch({type: GET_ALL_POKEMONS, payload: obj}))
    }
}