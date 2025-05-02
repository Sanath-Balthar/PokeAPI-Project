import { useNavigate } from 'react-router-dom'
import { usePokemonContext } from '../context/PokemonContext'

const DisplayItems = ({ props }) => {
  const navigate = useNavigate()
  const { setFavourites, compareList, setCompareList } = usePokemonContext()

  const favouritesFetch = JSON.parse(localStorage.getItem('Favourites')) || []

  const checkBoxHandler = (checkedPokemon) => {
    if (compareList.length > 4) {
      alert('You can only compare up to 5 pokemon')
      return
    }
    if (compareList.length !== 0 && compareList.find((pokemon) => pokemon.id === checkedPokemon.id)) {
      const removePokemon = compareList.filter((pokemon) => pokemon.id !== checkedPokemon.id)
      setCompareList(removePokemon)
    } else {
      setCompareList((prev) => [...prev, checkedPokemon])
    }
    // console.log(compareList)
  }

  return (
    <div className="md:grid md:grid-cols-4 md:gap-20 my-5 p-5 rounded-2xl shadow-3xl">
      {props.length !== 0 ? (
        props.map((pokemon, index) => {
          return (
            <div key={index} className="flex flex-row items-center gap-5 p-5 rounded-xl shadow-2xl bg-white border-5 border-amber-400 hover:bg-amber-500 hover:border-amber-700">
              <div className="flex flex-col items-center">
                {favouritesFetch.length !== 0 && JSON.parse(localStorage.getItem('Favourites')).find((fav) => fav.id === pokemon.id) ? (
                  <div
                    className="rounded-full bg-white"
                    onClick={() => {
                      const favRemoved = JSON.stringify(JSON.parse(localStorage.getItem('Favourites')).filter((fav) => fav.id !== pokemon.id))
                      localStorage.setItem('Favourites', favRemoved)
                      setFavourites(JSON.parse(favRemoved))
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-amber-500">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className={`rounded-full bg-white`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6  text-amber-500"
                      onClick={() => {
                        localStorage.setItem('Favourites', JSON.stringify([...favouritesFetch, pokemon]))
                        console.log([...favouritesFetch, pokemon])
                        setFavourites([...favouritesFetch, pokemon])
                      }}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </div>
                )}
                <div className="mt-20">
                  <input type="checkbox" checked={compareList.find((compPoke) => pokemon.id === compPoke.id) ? true : false} onChange={(e) => checkBoxHandler(pokemon)}></input>
                </div>
              </div>

              <div
                onClick={() => {
                  // localStorage.setItem('selectedPokemon', JSON.stringify(pokemon))
                  navigate(`/detailedview/pokemon/${pokemon.id}`)
                }}>
                <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 rounded-full border-2 border-amber-400" />
                <div>
                  <h1 className="text-xl font-bold">{pokemon.name}</h1>
                  <p className="text-sm text-gray-600">Id: {pokemon.id}</p>
                  <p className="text-sm text-gray-600">Types: {pokemon.types.map((types) => types.type.name).join(', ')}</p>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="w-full h-full text-center mt-10 text-gray-500">No Pokemon Found</div>
      )}
    </div>
  )
}

export default DisplayItems
