import debounce from 'lodash.debounce'

export const searchHandler = (searchInput, fetchHook, setPokeDisplay) => {
  fetchHook.setLoading(true)

  if (!fetchHook.pokemonList || fetchHook.pokemonList.length === 0) {
    fetchHook.setLoading(false)
    return
  }

  if (searchInput === '') {
    fetchHook.setLoading(false)
    setPokeDisplay(fetchHook.pokemonList)
    return
  }

  let findPoke = fetchHook.pokemonList
    .map((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return pokemon
      }
    })
    .filter((pokemon) => pokemon !== undefined)

  setPokeDisplay(findPoke)
  fetchHook.setLoading(false)
}

export const sortHandler = (selectedSort, pokeDisplay, setPokeDisplay, setSort) => {
  const [sortBy, sortOrder] = selectedSort.split('-')
  if (sortBy === 'id') {
    if (sortOrder === 'asc') {
      setPokeDisplay([...pokeDisplay].sort((a, b) => a.id - b.id))
      setSort('id-asc')
    } else {
      setPokeDisplay([...pokeDisplay].sort((a, b) => b.id - a.id))
      setSort('id-desc')
    }
  } else {
    if (sortOrder === 'asc') {
      setPokeDisplay([...pokeDisplay].sort((a, b) => a['name'].localeCompare(b['name'])))
      setSort('name-asc')
    } else {
      setPokeDisplay([...pokeDisplay].sort((a, b) => b['name'].localeCompare(a['name'])))
      setSort('name-desc')
    }
  }
}
