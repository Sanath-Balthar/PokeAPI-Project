import { useEffect, useMemo, useState } from "react";
import DisplayItems from "./Components/displayItems";
import Header from "./Components/Header";
import debounce from "lodash.debounce";
import usePokemon from "./Components/FetchPokemonHook";
import LoadigGraphic from "./Components/LoadingGraphic";

function App() {
  const [pokeDisplay, setPokeDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchHook = usePokemon();

  useEffect(() => {
    fetchHook.fetchPokemon(currentPage * 20);
  }, []);

  useEffect(() => {
    setPokeDisplay(fetchHook.pokemonList);
  }, [fetchHook.pokemonList]);

  const handleSearch = debounce((searchInput) => {
    fetchHook.setLoading(true);

    if (!fetchHook.pokemonList || fetchHook.pokemonList.length === 0) {
      fetchHook.setLoading(false);
      return;
    }

    if (searchInput === "") {
      fetchHook.setLoading(false);
      setPokeDisplay(fetchHook.pokemonList);
      return;
    }
    let findPoke = fetchHook.pokemonList
      .map((pokemon) => {
        if (pokemon.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return pokemon;
        }
      })
      .filter((pokemon) => pokemon !== undefined);
    setPokeDisplay(findPoke);
    fetchHook.setLoading(false);
  }, 500);

  const pokemonTypes = useMemo(() => {
    if (!fetchHook.pokemonList || fetchHook.pokemonList.length === 0) {
      return [];
    }

    return [
      ...new Set(
        fetchHook.pokemonList.flatMap((pokemon) =>
          pokemon.types.map((type) => type.type.name)
        )
      ),
    ];
  }, [fetchHook.pokemonList]);

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />

      <div className="flex flex-col items-center ">
        <input
          value={search}
          className="text-center mt-10 border-2 border-gray-400 bg-white rounded-lg hover:border-black hover:text-black"
          placeholder="Search Pokemon"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        ></input>

        <div>
          <button
            onClick={() => {
              setPokeDisplay(fetchHook.pokemonList);
              setSearch("");
              handleSearch("");
            }}
            className="bg-red-500 mt-5 mx-1 p-2 rounded-lg font-bold"
          >
            Reset Search
          </button>
        </div>

        <div className="mt-5">
          <select
            className="border-2 border-gray-400 bg-white rounded-lg p-2 "
            onChange={(e) => {
              const selectedType = e.target.value;
              if (
                !fetchHook.pokemonList ||
                fetchHook.pokemonList.length === 0
              ) {
                return;
              }

              if (selectedType === "") {
                setPokeDisplay(fetchHook.pokemonList);
                return;
              }

              const filteredByType = fetchHook.pokemonList.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
              );
              setPokeDisplay(filteredByType);
            }}
          >
            <option value="">Filter by Type</option>
            {pokemonTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-center items-center mt-5">
          <button
            className={` mx-2 md:p-2 rounded-lg font-bold ${
              currentPage === 0
                ? "bg-grey-200"
                : "bg-amber-300 hover:bg-amber-500"
            }`}
            disabled={currentPage === 0}
            onClick={() => {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              fetchHook.fetchPokemon(newPage * 20);
            }}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((pageNo) => (
              <button
                key={pageNo}
                className={`p-1 md:p-2 rounded-lg font-bold ${
                  currentPage === pageNo
                    ? "bg-orange-500 text-white"
                    : "bg-orange-200"
                }`}
                onClick={() => {
                  setCurrentPage(pageNo);
                  if (pageNo === 7) fetchHook.fetchPokemon(pageNo * 20, 10);
                  else fetchHook.fetchPokemon(pageNo * 20);
                }}
              >
                {pageNo + 1}
              </button>
            ))}
          </div>

          <button
            className={` mx-2 md:p-2 rounded-lg font-bold ${
              currentPage === 7
                ? "bg-grey-200"
                : "bg-amber-300 hover:bg-amber-500"
            }`}
            onClick={() => {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              console.log(newPage);
              if (newPage === 7) fetchHook.fetchPokemon(newPage * 20, 10);
              else fetchHook.fetchPokemon(newPage * 20);
            }}
          >
            Next
          </button>
        </div>

        {fetchHook.loading ? (
          <LoadigGraphic />
        ) : (
          <DisplayItems props={pokeDisplay} />
        )}
      </div>
    </div>
  );
}

export default App;
