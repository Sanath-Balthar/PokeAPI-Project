import { useState } from "react";
import axios from "axios";

const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (offset = 0, limit = 20) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (response.status === 200) {
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const urlResponse = await axios.get(pokemon.url);
            if (urlResponse.status === 200) {
              return {
                name: pokemon.name,
                id: urlResponse.data.id,
                image: urlResponse.data.sprites.front_default,
                types: urlResponse.data.types,
              };
            }
            return null;
          })
        );

        const validPokemon = pokemonDetails.filter(
          (pokemon) => pokemon !== null
        );
        console.log("validPokemon", validPokemon);
        setPokemonList(validPokemon);
      }
    } catch (error) {
      console.log("API error: ", error);
      alert("API fetch error");
    } finally {
      setLoading(false);
    }
  };

  return { pokemonList, fetchPokemon, loading, setLoading };
};

export default usePokemon;
