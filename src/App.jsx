import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import DisplayItems from "./Components/displayItems";
import Header from "./Components/Header";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokeDisplay, setPokeDisplay] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = useMemo(() => {
    return async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        if (response.status === 200) {
          console.log(response.data.results);
          response.data.results.map(async (pokemon) => {
            const urlResponse = await axios.get(pokemon.url);
            if (urlResponse.status !== 200) {
              return;
            }
            setPokemonList((prev) => [
              ...prev,
              {
                name: pokemon.name,
                id: urlResponse.data.id,
                image: urlResponse.data.sprites.front_default,
                types: urlResponse.data.types,
              },
            ]);
            setPokeDisplay((prev) => [
              ...prev,
              {
                name: pokemon.name,
                id: urlResponse.data.id,
                image: urlResponse.data.sprites.front_default,
                types: urlResponse.data.types,
              },
            ]);
            setLoading(false);
          });
        }
      } catch (error) {
        console.log("API error: ", error);
        alert("API fetch error");
      }
    };
  }, []);

  const handleSearch = () => {
    setLoading(true);
    if (searchInput === "") {
      setLoading(false);
      setPokeDisplay(pokemonList);
      return;
    }
    let findPoke = pokemonList
      .map((pokemon) => {
        if (pokemon.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return pokemon;
        }
      })
      .filter((pokemon) => pokemon !== undefined);
    setPokeDisplay(findPoke);
    setLoading(false);
  };

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />

      <div className="flex flex-col items-center ">
        <input
          value={searchInput}
          className="text-center mt-10 border-2 border-gray-400 bg-white rounded-lg hover:border-black hover:text-black"
          placeholder="Search Pokemon"
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>

        <div>
          <button
            onClick={handleSearch}
            className="bg-green-500 mt-5 mx-1 p-2 rounded-lg "
          >
            Serach Pokemon
          </button>
          <button
            onClick={() => {
              setPokeDisplay(pokemonList);
              setSearchInput("");
            }}
            className="bg-red-500 mt-5 mx-1 p-2 rounded-lg "
          >
            Reset Search
          </button>
        </div>

        <div className="mt-5">
          <select
            className="border-2 border-gray-400 bg-white rounded-lg p-2"
            onChange={(e) => {
              const selectedType = e.target.value;
              if (selectedType === "") {
                setPokeDisplay(pokemonList);
                return;
              }
              const filteredByType = pokemonList.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
              );
              setPokeDisplay(filteredByType);
            }}
          >
            <option value="">Filter by Type</option>
            {[
              ...new Set(
                pokemonList.flatMap((pokemon) =>
                  pokemon.types.map((type) => type.type.name)
                )
              ),
            ].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : (
          <DisplayItems props={pokeDisplay} />
        )}
      </div>
    </div>
  );
}

export default App;
