import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function SearchBox({ onSearch, data, onRefresh, onSelectPokemon, filteredPokeList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);

  // Extract unique types and weaknesses from the data
  const allTypes = [...new Set(data.map((pokemon) => pokemon.type).flat())];
  const allWeaknesses = [...new Set(data.map((pokemon) => pokemon.weaknesses).flat())];

  const handleSearch = () => {
    onSearch({
      name: searchTerm,
      types: selectedTypes,
      weaknesses: selectedWeaknesses,
    });
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleWeaknessChange = (weakness) => {
    if (selectedWeaknesses.includes(weakness)) {
      setSelectedWeaknesses(selectedWeaknesses.filter((w) => w !== weakness));
    } else {
      setSelectedWeaknesses([...selectedWeaknesses, weakness]);
    }
  };

  const handleRefresh = () => {
    setSearchTerm(''); // Clear the search term
    setSelectedTypes([]); // Clear selected types
    setSelectedWeaknesses([]); // Clear selected weaknesses
    onRefresh(); // Notify the parent component to refresh the list
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Checkboxes for types */}
      <div>
        <label>Types:</label>
        {allTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Checkboxes for weaknesses */}
      <div>
        <label>Weaknesses:</label>
        {allWeaknesses.map((weakness) => (
          <label key={weakness}>
            <input
              type="checkbox"
              value={weakness}
              checked={selectedWeaknesses.includes(weakness)}
              onChange={() => handleWeaknessChange(weakness)}
            />
            <span>{weakness}</span>
          </label>
        ))}
      </div>

      <button onClick={handleSearch}>Search</button>
      <button onClick={handleRefresh}>Refresh</button>
      <ul className="pokemonInfoContainer">
          {filteredPokeList.map((pokemon) => (
            <li className="pokemonInfo" key={pokemon.id}>
              <div className="pokemonCard">
                <NavLink
                  className="pokemonDetailLink"
                  to={`/details/${pokemon.id}`}
                  onClick={() => onSelectPokemon(pokemon.id)}
                >
                  {pokemon.name}
                  <img src={pokemon.img} alt={pokemon.name} />
                </NavLink>

                <p>Num: {pokemon.num}</p>
                <p>Type: {pokemon.type.join(", ")}</p>
                <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default SearchBox;

