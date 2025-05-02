import { useEffect } from 'react'
import Header from '../Components/Header'
import { usePokemonContext } from '../context/PokemonContext'
import { useNavigate } from 'react-router-dom'

export const DetailedView = () => {
  const { pokeDisplay } = usePokemonContext()

  let navigate = useNavigate()

  //   useEffect(() => {

  //   }, [])

  const pokemonId = window.location.pathname.split('/')[3]
  const pokemon = pokeDisplay.find((pokemon) => pokemon.id === parseInt(pokemonId))

  console.log(pokemon)
  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />
      <button type="button" onClick={(e) => navigate(-1)} className=" mt-5 mx-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded ">
        Back
      </button>
      <div className="flex flex-col justify-center items-center">
        <img src={pokemon.image} alt={pokemon.name} className="w-50 h-50 rounded-full border-5 border-amber-400" />
        <div className="flex flex-col justify-center items-center gap-2 mx-10">
          <h1 className="text-xl font-bold">{pokemon.name}</h1>
          <div className=" flex text-sm text-gray-600">
            <h2 className="font-bold">Id: </h2>&nbsp;{pokemon.id}
          </div>
          <div className="flex text-sm text-gray-600">
            <h2 className="font-bold">Types: </h2>&nbsp; {pokemon.types.map((types) => types.type.name).join(', ')}
          </div>
          <div className="flex text-sm text-gray-600">
            <h2 className="font-bold">Abilities: </h2> &nbsp;{pokemon.abilities.map((abilities) => abilities.ability.name).join(', ')}
          </div>
          <div className="flex text-sm text-gray-600">
            <h2 className="font-bold">Stats: </h2> &nbsp;{pokemon.stats.map((stats) => stats.stat.name).join(', ')}
          </div>
          <div className="flex text-sm text-gray-600">
            <h2 className="font-bold">Moves: </h2>&nbsp; {pokemon.moves.map((moves) => moves.move.name).join(', ')}
          </div>
        </div>
      </div>
    </div>
  )
}
