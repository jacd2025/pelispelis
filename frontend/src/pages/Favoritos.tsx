import { Header } from '@/components/Header'

export function Favoritos() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">Pelis Pelis</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Tus favoritos</h1>
        <p className="mt-5 max-w-xl text-zinc-400">
          Aquí encontrarás las películas que guardaste para volver a verlas cuando quieras.
        </p>
      </section>
    </main>
  )
}
