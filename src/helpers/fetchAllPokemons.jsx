import { baseURL } from '../api/pokemonApi';

export const fetchAllPokemons = async () => {
    const response = await fetch(baseURL + '/pokemon?limit=1500')
    const data = await response.json()
    console.log(data.results);

    return transformSmallPokemonIntoPokemon(data.results);
}

const transformSmallPokemonIntoPokemon = (smallPokemonList) => {

    const pokemonArr = smallPokemonList.map(poke => {
        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return {
            id,
            pic,
            name: poke.name,
            url: poke.url
        }
    });

    return pokemonArr;
}