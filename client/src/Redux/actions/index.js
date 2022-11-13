import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const FILTER_BY_STORAGE = 'FILTER_BY_STORAGE';
export const SORT_BY_ATTACK = 'SORT_BY_ATTACK';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const GET_TYPES = 'GET_TYPES'

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

export function searchPokemon(name){
    return async function(dispatch){
        const pokemon = await axios.get(`http://localhost:3001/pokemons/${name}`)
        return dispatch({
            type: SEARCH_POKEMON,
            payload: pokemon.data
        })
    }
}

export function filterByStorage(store){
        return {
            type: FILTER_BY_STORAGE,
            payload: store
        }
}

export function sortByAttack(attack){
    return {
        type: SORT_BY_ATTACK,
        payload: attack
    }
}

export function sortByName(name){
    return {
        type: SORT_BY_NAME,
        payload: name
    }
}

export function getTypes(){
    return async function(dispatch){
        const types = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: GET_TYPES,
            payload: types
        })
    }
}