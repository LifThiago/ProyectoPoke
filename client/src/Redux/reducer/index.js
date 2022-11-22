import { SORT_BY_STORAGE, GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_TYPES, SEARCH_POKEMON, SORT_BY_ATTACK, SORT_BY_NAME, SORT_BY_TYPE } from "../actions";

const initialState = {
    allPokemons: [],
    pokemon: {},
    pokemonsFilter: [],
    pokemonsPage: [],
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                pokemonsFilter: action.payload,
                pokemonsPage: action.payload
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

        case SORT_BY_STORAGE:{
            let allPokemonsFilteredDb = state.pokemonsFilter

            const filterByStorage =
            action.payload === 'inDb'
            ? allPokemonsFilteredDb.filter(p => p.createdDb)
            : action.payload === 'inApi'
            ? allPokemonsFilteredDb.filter(p => !p.createdDb)
            : action.payload === 'all' && allPokemonsFilteredDb
            return{
                ...state,
                allPokemons: 
                action.payload === 'all' ? allPokemonsFilteredDb : filterByStorage
            }
        }

        case SORT_BY_ATTACK: {
            let sortByAttack = 
            action.payload === 'asc'
            ? state.allPokemons.sort(function(a, b){return a.attack - b.attack})
            : state.allPokemons.sort(function(a ,b){return b.attack - a.attack});
            return {
                ...state,
                allPokemons: sortByAttack
            }
        }
        
        case SORT_BY_NAME: {
            let sortByName = 
            action.payload === 'asc'
            ? state.allPokemons.sort((a,b) => a.name.localeCompare(b.name))
            : state.allPokemons.sort((a,b) => b.name.localeCompare(a.name))
            return {
                ...state,
                allPokemons: sortByName
            };
        }

        case SORT_BY_TYPE: {
            const pokemonsType = state.pokemonsPage

            const typeFilter =
            action.payload === 'none'
            ? pokemonsType
            : pokemonsType.filter(p => p.type[0] === action.payload || p.type[1] === action.payload)

            return {
                ...state,
                allPokemons: typeFilter
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