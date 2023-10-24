import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokeList, setPokeList] = useState([]);
  

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



  return (
    <>
      <h1 className="characterPageHeading" >PokeDex</h1>
      <ul className="pokemonInfoContainer">
        {pokeList.map((pokemonName) => {
          return <li className="pokemonInfo" key={pokemonName.id}>
          <div className="pokemonCard">{pokemonName.name}:
            <img src={pokemonName.img} alt={pokemonName.name} />
            <p>Type: {pokemonName.type}</p>
            <p>Height: {pokemonName.height}</p>
            <p>Weight: {pokemonName.weight}</p>
            <p>Weaknesses: {pokemonName.weaknesses}</p>
          </div>
            
            </li>;
        })}
      </ul>
      
    </>
  );
}

export default App;
