import Header from '../Components/Header'
import DisplayItems from '../Components/displayItems'
import { usePokemonContext } from '../context/PokemonContext'
import { NavigationBar } from '../Components/navigationBar'
import useFetchPokemon from '../hooks/FetchPokemonHook'
import { useEffect } from 'react'
import LoadigGraphic from '../Components/LoadingGraphic'

export const RandomPokemon = () => {
  const fetchHook = useFetchPokemon()

  const { currentPage, setCurrentPage, pokeDisplay, setPokeDisplay, pokemonsPerPage, setPokemonsPerPage, sort, setSort } = usePokemonContext()

  useEffect(() => {
    fetchRandomPokemon()
  }, [])

  const fetchRandomPokemon = async () => {
    const randomOffset = Math.floor(Math.random() * 150)
    await fetchHook.fetchPokemon(randomOffset, 1, sort)
    setPokeDisplay(fetchHook.pokemonList)
  }

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />
      <NavigationBar />

      <div className="flex flex-row justify-center mt-5">
        <button onClick={fetchRandomPokemon} className="bg-amber-300 mt-5 mx-1 p-2 rounded-lg font-bold hover:bg-amber-500">
          Get Random Pokémon
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">{fetchHook.loading ? <LoadigGraphic /> : <DisplayItems props={pokeDisplay} />}</div>
    </div>
  )
}
