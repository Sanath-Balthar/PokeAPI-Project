import { createContext, useContext, useState } from 'react'

const PokemonContext = createContext()

export const PokemonProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20)
  const [totalPages, setTotalPages] = useState(8)
  const [pokeDisplay, setPokeDisplay] = useState([])
  const [sort, setSort] = useState('id-asc')
  const [favourites, setFavourites] = useState([])
  const [compareList, setCompareList] = useState([])

  return (
    <PokemonContext.Provider
      value={{
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        pokeDisplay,
        setPokeDisplay,
        pokemonsPerPage,
        setPokemonsPerPage,
        totalPages,
        setTotalPages,
        sort,
        setSort,
        favourites,
        setFavourites,
        compareList,
        setCompareList,
      }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)
