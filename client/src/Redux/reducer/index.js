import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, SEARCH_POKEMON } from "../actions";

const initialState = {
    allPokemons: [],
    pokemon: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload
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

        default:
            return {...state}
    }
}

export default rootReducer;