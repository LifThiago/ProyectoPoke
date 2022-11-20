import axios from "axios";

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const SORT_BY_STORAGE = 'SORT_BY_STORAGE';
export const SORT_BY_ATTACK = 'SORT_BY_ATTACK';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const GET_TYPES = 'GET_TYPES';
export const SORT_BY_TYPE = 'SORT_BY_TYPE'


export function getAllPokemons() {
    return async function(dispatch){
        const allPokemons = await axios.get('https://thiagopokedex.herokuapp.com/pokemons')
        .catch(err => {throw alert(err)})
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: allPokemons.data
        })
    }
}

export function getPokemonById(id){
    return async function(dispatch){
        const pokemon = await axios.get(`https://thiagopokedex.herokuapp.com/pokemons/${id}`)
        .catch(err => {throw alert('No pokemon was found with that Id or Name')})
        return dispatch({
            type: GET_POKEMON_BY_ID,
            payload: pokemon.data
        })
    }
}

export function searchPokemon(name){
    return async function(dispatch){
        const pokemon = await axios.get(`https://thiagopokedex.herokuapp.com/pokemons/${name}`)
        .catch(err => {throw alert('No pokemon was found with that Id or Name')})
        return dispatch({
            type: SEARCH_POKEMON,
            payload: pokemon.data
        })
    }
}

export function sortByStorage(store){
        return {
            type: SORT_BY_STORAGE,
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

export function sortByType(type){
    return {
        type: SORT_BY_TYPE,
        payload: type
    }
}

export function getTypes(){
    return async function(dispatch){
        const types = await axios.get('https://thiagopokedex.herokuapp.com/types')
        .catch(err => {throw alert(err)})
        return dispatch({
            type: GET_TYPES,
            payload: types.data
        })
    }
}
