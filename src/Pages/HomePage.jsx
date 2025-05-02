import { useEffect, useMemo, useState } from 'react'
import DisplayItems from '../Components/displayItems'
import Header from '../Components/Header'
import LoadigGraphic from '../Components/LoadingGraphic'
import Pagination from '../Components/pagination'
import { usePokemonContext } from '../context/PokemonContext'
import { searchHandler, sortHandler } from '../utils/handlers'
import useFetchPokemon from '../hooks/FetchPokemonHook'
import { NavigationBar } from '../Components/navigationBar'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [filterTypeClicked, setFilterTypeClicked] = useState(false)
  const { search, setSearch, currentPage, setCurrentPage, pokeDisplay, setPokeDisplay, pokemonsPerPage, setPokemonsPerPage, totalPages, setTotalPages, sort, setSort, compareList, setCompareList } = usePokemonContext()

  const fetchHook = useFetchPokemon()

  const navigate = useNavigate()

  useEffect(() => {
    fetchHook.fetchPokemon((currentPage - 1) * pokemonsPerPage, pokemonsPerPage, sort)
  }, [currentPage, pokemonsPerPage, sort])

  useEffect(() => {
    setPokeDisplay(fetchHook.pokemonList)
  }, [fetchHook.pokemonList])

  const handleTypeFilterChange = (type) => {
    try {
      const updatedTypes = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type]

      setSelectedTypes(updatedTypes)

      if (updatedTypes.length === 0) {
        setPokeDisplay(fetchHook.pokemonList)
        return
      }

      const filteredByType = fetchHook.pokemonList.filter((pokemon) => pokemon.types.some((t) => updatedTypes.includes(t.type.name)))
      setPokeDisplay(filteredByType)
    } catch (error) {
      console.error('Error filtering Pokémon by type:', error)
    }
  }

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />
      <NavigationBar />

      <div className="flex flex-col items-center ">
        <div>
          <input
            value={search}
            className="text-center mt-10 border-2 border-gray-400 bg-white rounded-lg hover:border-black hover:text-black"
            placeholder="Search Pokemon"
            onChange={(e) => {
              try {
                setSearch(e.target.value)
                searchHandler(e.target.value, fetchHook, setPokeDisplay)
              } catch (error) {
                console.error('Error handling search:', error)
              }
            }}></input>
          <button
            onClick={() => {
              try {
                setPokeDisplay(fetchHook.pokemonList)
                setSearch('')
                searchHandler('', fetchHook, setPokeDisplay)
              } catch (error) {
                console.error('Error resetting search:', error)
              }
            }}
            className="bg-amber-300 mt-5 mx-3 p-2 rounded-lg font-bold hover:bg-amber-500 ">
            Reset Search
          </button>
        </div>

        <div className="flex mt-5 relative">
          <div
            className="mx-2 border-2 border-gray-400 bg-white rounded-lg p-2 cursor-pointer"
            onClick={(e) => {
              try {
                setFilterTypeClicked(!filterTypeClicked)
              } catch (error) {
                console.error('Error toggling filter dropdown:', error)
              }
            }}>
            Filter by Type
          </div>
          {filterTypeClicked && (
            <div className="absolute bg-white border-2 border-gray-400 rounded-lg p-2 mt-15 md:mt-10 md:ml-2 md:w-28 min-h-40 overflow-y-auto">
              {fetchHook.pokemonTypes.map((type, index) => (
                <div key={index} className="flex items-center">
                  <input type="checkbox" id={`type-${type}`} checked={selectedTypes.includes(type)} onChange={() => handleTypeFilterChange(type)} className="mr-2" />
                  <label htmlFor={`type-${type}`}>{type}</label>
                </div>
              ))}
            </div>
          )}

          <div className="">
            <select
              className="mx-2 border-2 border-gray-400 bg-white rounded-lg p-2 "
              value={sort}
              onChange={(e) => {
                try {
                  sortHandler(e.target.value, pokeDisplay, setPokeDisplay, setSort)
                } catch (error) {
                  console.error('Error sorting Pokémon:', error)
                }
              }}>
              <option value="id-asc">Sort by Id : Ascending</option>
              <option value="id-desc">Sort by Id : Descending</option>
              <option value="name-asc">Sort by Name : Ascending</option>
              <option value="name-desc">Sort by Name : Descending</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex md:flex-row w-full items-center justify-center mt-5">
          <Pagination currentPage={currentPage} totalPages={totalPages} pokemonsPerPage={pokemonsPerPage} setCurrentPage={setCurrentPage} fetchHook={fetchHook} />

          <div className="flex mt-5 md:mt-0 md:ml-[20%]">
            <select
              className="border-2 border-gray-400 bg-white rounded-lg p-2"
              defaultValue={pokemonsPerPage}
              onChange={(e) => {
                try {
                  const perPage = parseInt(e.target.value, 10)
                  setPokemonsPerPage(perPage)
                  setCurrentPage(1)
                  setTotalPages(Math.ceil(150 / perPage))
                  setSort('id-asc')
                  fetchHook.fetchPokemon(0 * perPage, perPage, sort)
                } catch (error) {
                  console.error('Error changing items per page:', error)
                }
              }}>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        {compareList.length !== 0 && (
          <button onClick={() => navigate('/compare')} className="bg-amber-300 mt-5 mx-1 p-2 rounded-lg font-bold hover:bg-amber-500 cursor-pointer ">
            Compare
          </button>
        )}
        {fetchHook.loading ? <LoadigGraphic /> : <DisplayItems props={pokeDisplay} />}
      </div>
    </div>
  )
}

export default HomePage
