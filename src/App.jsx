import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import PokemonDetails from "./PokemonDetails";

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [filteredPokeList, setFilteredPokeList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPokeList(result.pokemon);
        setFilteredPokeList(result.pokemon);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = ({ name, types, weaknesses }) => {
    // Filter the Pokemon list based on multiple criteria
    const filteredPokemon = pokeList.filter((pokemon) => {
      const matchesName =
        !name ||
        (name && pokemon.name.toLowerCase().includes(name.toLowerCase()));
      const matchesTypes =
        types.length === 0 ||
        types.every((type) => pokemon.type.includes(type));
      const matchesWeaknesses =
        weaknesses.length === 0 ||
        weaknesses.every((weakness) => pokemon.weaknesses.includes(weakness));
      return matchesName && matchesTypes && matchesWeaknesses;
    });

    setFilteredPokeList(filteredPokemon);
  };

  const handleSelectPokemon = (pokemonId) => {
    //pokeList is an array of pokemon objects
    //pokemonId is one id on one of those objects
    //find the pokemon object within pokeList that has a matching id.
    const selected = pokeList.find((pokemon) => pokemon.id === pokemonId);
    console.log(selected);
    if (selected) {
      setSelectedPokemon(selected);
    } else {
      console.error("Pokemon not found");
    }

    
  };

  const handleRefresh = () => {
    // Simply reset the filtered list to the full list of Pokémon
    setFilteredPokeList(pokeList);
  };

  const onNavigate = () => {
    setSelectedPokemon(null);
  };

  const onNavigateToHome = () => {
    window.location = "/";
  };

  return (
    <Router>
      <div>
        <h1 className="characterPageHeading">PokeDex</h1>
        <Routes>
          <Route
            path="/"
            element={
              <SearchBox
                onSearch={handleSearch}
                onRefresh={handleRefresh}
                data={pokeList}
                onSelectPokemon={handleSelectPokemon}
                filteredPokeList={filteredPokeList}
              />
            }
          />
          <Route
            path="/details/:id"
            element={
              <PokemonDetails
                pokemon={selectedPokemon}
                onNavigate={onNavigate}
                onSelectPokemon={handleSelectPokemon}
                navigateToHome={onNavigateToHome}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
