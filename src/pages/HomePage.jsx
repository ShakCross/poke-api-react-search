import { useState } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { baseURL } from '../api/pokemonApi';

//const OtherComponent = React.lazy(() => import('./OtherComponent'));

export const HomePage = () => {
  const { isLoading, pokemons } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  let [pokemonData, setPokemonData] = useState()

  const filteredPokemons = () => {
    if (search.length === 0) {
      return pokemons.slice(currentPage, currentPage + 4);
    }

    // Si hay algo en la caja de texto
    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 4);
  };

  const nextPage = () => {
    if (pokemons.filter((poke) => poke.name.includes(search)).length > currentPage + 4) {
      setCurrentPage(currentPage + 4);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 4);
    }
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  const handleClick = async (id) => {
    const response = await fetch(baseURL + '/pokemon/' + id)
    const data = await response.json()
    console.log(data);
    setPokemonData(pokemonData = data)
  };

  return (
    <div className="wrapper">
              <h1 className="title">Lista Pokemon</h1>
      <div className="content">
        <div className="main">
          <input
            type="text"
            className=""
            placeholder="Buscar Pokémon"
            value={search}
            onChange={onSearchChange}
          />
          <div className="pokemon-list">
            {filteredPokemons().map(({ id, name, pic }) => (
              <div className="card" key={id} onClick={() => handleClick(id)}>
                <img src={pic} alt={name} style={{ width: 170 }} />
                <div>{"# " + id}</div>
                <div className="name">{name}</div>
              </div>
            ))}
          </div>
          {isLoading && <Loading />}
        </div>
        {pokemonData && 
        <div className="pokedex">
          <img className="image" src={pokemonData.sprites.other["official-artwork"].front_default} alt="" srcset="" />
          <div className="id">
            {"# "+pokemonData.id}
          </div>
          <div className="name">{pokemonData.name}</div>
          <div className="type">
            <div>Tipos</div>
            <div className="type-name">
            {pokemonData.types.map((pkm) => <div className="types-name" key={pkm.type.name}>{pkm.type.name}</div>)}
            </div>
          </div>
          <div className="weight">
            <div>Peso</div>
            <div className="kg">
            {pokemonData.weight/10 +"kg"}
            </div>
          </div>
          <div className="sprites">
            <div>Sprites</div>
            <div className="sprites-img">
            <img src={pokemonData.sprites.front_default} alt="sprite" />
            <img src={pokemonData.sprites.front_shiny} alt="sprite" />
            <img src={pokemonData.sprites.back_default} alt="sprite" />
            <img src={pokemonData.sprites.back_shiny} alt="sprite" />
            </div>
          </div>
          <div className="movements">
            <div>Movimientos</div>
            <div className="moves">
            {pokemonData.moves.slice(0,5).map((pkm) => <div key={pkm.move.name}>{pkm.move.name}</div>)}
            </div>
          </div>
        </div>}
      </div>
      <div className={currentPage > 0 ? "footer" : "footer alignNext"}>
        {currentPage > 0 && <button className="buttons" onClick={prevPage}>
          <i className="fa-solid fa-chevron-left"></i>
          Atrás
        </button>}
        <button className="buttons" onClick={nextPage}>
          Siguiente
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
