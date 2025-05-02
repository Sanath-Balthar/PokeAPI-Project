import { useNavigate } from 'react-router-dom'

export const NavigationBar = () => {
  const navigate = useNavigate()

  return (
    <div className=" border-b-5   border-amber-300">
      <nav className="flex justify-center bg-amber-100 py-4">
        <ul className="flex space-x-8">
          <li className="cursor-pointer text-center text-black font-bold bg-amber-200 hover:text-white hover:bg-amber-500 px-1 md:px-4 md:py-2 rounded-lg transition-all duration-300" onClick={() => navigate('/')}>
            Home
          </li>
          <li className="cursor-pointer text-center text-black font-bold bg-amber-200 hover:text-white hover:bg-amber-500 px-1 md:px-4 md:py-2 rounded-lg transition-all duration-300" onClick={() => navigate('/favourites')}>
            Favourites
          </li>
          <li className="cursor-pointer text-center text-black font-bold bg-amber-200 hover:text-white hover:bg-amber-500 px-1 md:px-4 md:py-2 rounded-lg transition-all duration-300" onClick={() => navigate('/randomPokemon')}>
            Random Pokémon
          </li>
        </ul>
      </nav>
    </div>
  )
}
