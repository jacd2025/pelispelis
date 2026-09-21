import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="border-b px-6 py-4">
        <Link to="/" className="font-semibold">Pelispelis</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <section className="mx-auto max-w-3xl px-6 py-16">
              <h1 className="text-4xl font-bold tracking-tight">Bienvenido a Pelispelis</h1>
              <p className="mt-4 text-muted-foreground">
                Tu aplicación de películas está lista para comenzar.
              </p>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App
