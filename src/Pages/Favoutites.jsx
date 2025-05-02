import { useEffect } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
import DisplayItems from '../Components/displayItems'
import { usePokemonContext } from '../context/PokemonContext'
import { NavigationBar } from '../Components/navigationBar'

export const Favourites = () => {
  const { favourites, setFavourites } = usePokemonContext()

  let navigate = useNavigate()

  useEffect(() => {
    const tempFav = JSON.parse(localStorage.getItem('Favourites')) || []
    // console.log(tempFav)
    setFavourites(tempFav)
  }, [])

  return (
    <div className=" w-full min-h-screen bg-amber-100">
      <Header />
      <NavigationBar />
      <button type="button" onClick={(e) => navigate(-1)} className=" mt-5 mx-5 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded ">
        Back
      </button>
      <div className="flex flex-col justify-center items-center">
        <DisplayItems props={favourites} />
      </div>
    </div>
  )
}
