import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setPokeList(result.pokemon);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function imgClickHandle (id) {
    setSelectedPokemon((prevPokemon) => {
      return [...prevPokemon, id]
    });
  }

  return (
    <>
      <h1>PokeDex</h1>
      <ul className="pokemonInfoContainer">
        {pokeList.map((pokemonName) => {
          return <li className="pokemonInfo" key={pokemonName.id}>
            {pokemonName.name}:
            <img onClick={() => imgClickHandle(pokemonName.id)} src={pokemonName.img} alt={pokemonName.name} />
            <p>Weaknesses: {pokemonName.weaknesses}</p>
            <p>Height: {pokemonName.height}</p>
            <p>Weight: {pokemonName.weight}</p>
            <p>Egg: {pokemonName.egg}</p>
            
            </li>;
        })}
      </ul>
      
    </>
  );
}

export default App;
