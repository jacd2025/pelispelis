import { Route, Routes } from 'react-router-dom'
import { Comunidad } from '@/pages/Comunidad'
import { Favoritos } from '@/pages/Favoritos'
import { Home } from '@/pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/comunidad" element={<Comunidad />} />
    </Routes>
  )
}

export default App
