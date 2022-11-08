import { FILTER_BY_STORAGE, GET_ALL_POKEMONS, GET_POKEMON_BY_ID, SEARCH_POKEMON } from "../actions";

const initialState = {
    allPokemons: [],
    pokemon: {},
    pokemonsFilter: []
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

        default:
            return {...state}
    }
}

export default rootReducer;