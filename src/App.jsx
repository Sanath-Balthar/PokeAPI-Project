import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import { PokemonProvider } from './context/PokemonContext'
import { DetailedView } from './Pages/DetailedViewPage'
import { Favourites } from './Pages/Favoutites'
import { Compare } from './Pages/Compare'
import { RandomPokemon } from './Pages/RandomPokemon'

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detailedView/pokemon/:id" element={<DetailedView />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/randomPokemon" element={<RandomPokemon />} />
        </Routes>
      </Router>
    </PokemonProvider>
  )
}

export default App
