import React from "react";
import { NavLink } from "react-router-dom";

function PokemonDetails({
  pokemon,
  onNavigate,
  onSelectPokemon,
  navigateToHome,
}) {
  if (!pokemon) {
    return (
      <div>
        Select a Pokemon to see details.
        <button onClick={navigateToHome}>Back to List</button>
      </div>
    );
  }

  const { next_evolution, prev_evolution } = pokemon;
  console.log(pokemon);

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.img} alt={pokemon.name} />
      <p className="selectedPokemon"><span className="selectedInfo">Number:</span> {pokemon.num}</p>
      <p className="selectedPokemon"><span className="selectedInfo">Type:</span> {pokemon.type ? pokemon.type.join(", ") : "N/A"}</p>
      <p className="selectedPokemon">
        <span className="selectedInfo">Weaknesses:</span> {pokemon.weaknesses ? pokemon.weaknesses.join(", ") : "N/A"}
      </p>

      {/* Link to next evolution */}
      {next_evolution && (
        <div>
          <span className="evolutionHeading">Next Evolution:</span>
          <ol>
            {next_evolution.map((evolution, index) => (
              <li key={index}>
                <NavLink
                  className="pokemonDetailLink"
                  to={`/details/${evolution.num}`}
                  onClick={() => onSelectPokemon(evolution.num)}
                >
                  {evolution.name}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Link to previous evolution */}
      {prev_evolution && (
        <div>
          <span className="evolutionHeading">Previous Evolution:</span>
          <ol>
            {prev_evolution.map((evolution, index) => (
              <li key={index}>
                <NavLink
                  className="pokemonDetailLink"
                  to={`/details/${evolution.num}`}
                  onClick={() => onSelectPokemon(evolution.num)}
                >
                  {evolution.name}
                  
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Back button to return to the main list */}
      <button onClick={navigateToHome}>Back to List</button>
    </div>
  );
}

export default PokemonDetails;
