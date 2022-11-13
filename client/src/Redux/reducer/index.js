import { FILTER_BY_STORAGE, GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_TYPES, SEARCH_POKEMON, SORT_BY_ATTACK, SORT_BY_NAME } from "../actions";

const initialState = {
    allPokemons: [],
    pokemon: {},
    pokemonsFilter: [],
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemonsFilter: action.payload
            }

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemon: action.payload
            }

        case SEARCH_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }

        case FILTER_BY_STORAGE:{
            let allPokemonsFilteredDb = state.pokemonsFilter

            const filterByStorage =
            action.payload === 'inDb' ? state.pokemonsFilter.filter(p => p.createdDb) :
            state.pokemonsFilter.filter(p => !p.createdDb);
            return{
                ...state,
                allPokemons: 
                action.payload === 'all' ? allPokemonsFilteredDb : filterByStorage
            }
        }

        case SORT_BY_ATTACK: {
            let pokemonsSorted = state.pokemonsFilter
            const sortByAttack =
            action.payload === 'asc' ? state.pokemonsFilter.sort(function(a,b){return a.attack - b.attack}) : 
            state.pokemonsFilter.sort(function(a ,b){return b.attack - a.attack});
            return {
                ...state,
                allPokemons: action.payload === 'random' ? pokemonsSorted : sortByAttack
            }
        }
        
        case SORT_BY_NAME: {
            let sortByName = 
            action.payload === 'asc' ? 
            state.pokemonsFilter.sort((a,b) => a.name.localeCompare(b.name)) :
            state.pokemonsFilter.sort((a,b) => b.name.localeCompare(a.name))
            return {
                ...state,
                allPokemons: sortByName
            }
        }

        case GET_TYPES: {
            return {
                ...state,
                types: action.payload
            }
        }

        default:
            return {...state}
    }
}

export default rootReducer;