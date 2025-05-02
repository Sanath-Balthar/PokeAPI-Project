import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import { NavigationBar } from '../Components/navigationBar'
import { usePokemonContext } from '../context/PokemonContext'
import DisplayItems from '../Components/displayItems'

export const Compare = () => {
  const { compareList, setCompareList } = usePokemonContext()

  let navigate = useNavigate()

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />
      <NavigationBar />
      <button type="button" onClick={(e) => navigate(-1)} className=" mt-5 mx-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded ">
        Back
      </button>
      <div className="flex flex-col justify-center items-center m-4">
        {compareList.length > 1 ? (
          <table className="table-auto border-collapse border border-gray-400 bg-amber-100 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Parameter</th>
                {compareList.map((pokemon, index) => (
                  <th key={index} className="border border-gray-400 px-4 py-2">
                    {pokemon.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2 font-bold">ID</td>
                {compareList.map((pokemon, index) => (
                  <td key={index} className="border border-gray-400 px-4 py-2">
                    {pokemon.id}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2 font-bold">Types</td>
                {compareList.map((pokemon, index) => (
                  <td key={index} className="border border-gray-400 px-4 py-2">
                    {pokemon.types.map((type) => type.type.name).join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2 font-bold">Abilities</td>
                {compareList.map((pokemon, index) => (
                  <td key={index} className="border border-gray-400 px-4 py-2">
                    {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2 font-bold">Base Stats</td>
                {compareList.map((pokemon, index) => (
                  <td key={index} className="border border-gray-400 px-4 py-2">
                    {pokemon.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 mt-5">Please select at least two Pokémon to compare.</p>
        )}
      </div>
    </div>
  )
}
