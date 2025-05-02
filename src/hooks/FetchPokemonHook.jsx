import { useState } from 'react'
import axios from 'axios'

const useFetchPokemon = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [pokemonAbilities, setPokemonAbilities] = useState([])
  const [pokemonMoves, setPokemonMoves] = useState([])

  const fetchPokemon = async (offset = 0, limit = 20, sort = 'id-asc') => {
    try {
      setLoading(true)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      if (response.status === 200) {
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            try {
              const urlResponse = await axios.get(pokemon.url)
              if (urlResponse.status === 200) {
                return {
                  name: pokemon.name,
                  id: urlResponse.data.id,
                  image: urlResponse.data.sprites.front_default,
                  types: urlResponse.data.types,
                  abilities: urlResponse.data.abilities,
                  stats: urlResponse.data.stats,
                  moves: urlResponse.data.moves,
                }
              }
            } catch (error) {
              console.error('Error fetching Pokémon details:', error)
            }
            return null
          })
        )

        const validPokemon = pokemonDetails.filter((pokemon) => pokemon !== null)

        // Apply sorting
        const [sortBy, sortOrder] = sort.split('-')
        const sortedPokemon = sortBy === 'id' ? validPokemon.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id)) : validPokemon.sort((a, b) => (sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))

        setPokemonList(sortedPokemon)

        const pokeTypes = [...new Set(validPokemon.flatMap((pokemon) => pokemon.types.map((type) => type.type.name)))]
        setPokemonTypes(pokeTypes)

        const pokeAbilities = [...new Set(validPokemon.flatMap((pokemon) => pokemon.abilities.map((ability) => ability.ability.name)))]
        setPokemonAbilities(pokeAbilities)

        const pokeMoves = [...new Set(validPokemon.flatMap((pokemon) => pokemon.moves.map((move) => move.move.name)))]
        setPokemonMoves(pokeMoves)
      }
    } catch (error) {
      console.error('Error fetching Pokémon list:', error)
      alert('Failed to fetch Pokémon list. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return { pokemonList, pokemonTypes, pokemonAbilities, pokemonMoves, fetchPokemon, loading, setLoading }
}

export default useFetchPokemon
