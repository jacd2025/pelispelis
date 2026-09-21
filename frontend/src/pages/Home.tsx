import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { HeroCarousel } from '@/components/HeroCarousel'
import { MovieCard } from '@/components/MovieCard'
import { usePopularMovies } from '@/hooks/usePopularMovies'
import { useTrendingMovies } from '@/hooks/useTrendingMovies'

export function Home() {
  const { data, isLoading, isError } = usePopularMovies()
  const {
    movies: trendingMovies,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
    isNotFound: isTrendingNotFound,
    hasNoData: hasNoTrendingData,
  } = useTrendingMovies()
  const popularMovies = Array.isArray(data) ? data : []

  useEffect(() => {
    console.log('[Home] Popular movies response:', data)
    console.log('[Home] Popular movies type:', Array.isArray(data) ? 'array' : typeof data)
    console.log('[Home] Popular movies count:', popularMovies.length)
  }, [data, popularMovies.length])

  useEffect(() => {
    if (isError) {
      console.error('[Home] Error loading popular movies')
    }
  }, [isError])

  if (isLoading) {
    return <PageShell><p className="text-zinc-400">Cargando películas...</p></PageShell>
  }

  if (isError) {
    return <PageShell><p className="text-red-400">No se pudieron cargar las películas.</p></PageShell>
  }

  return (
    <PageShell>
      {isTrendingLoading ? (
        <div className="flex min-h-80 items-center justify-center border-b border-white/10 text-zinc-400">
          Cargando tendencias...
        </div>
      ) : isTrendingNotFound ? (
        <TrendingMessage>La sección de tendencias no está disponible.</TrendingMessage>
      ) : isTrendingError ? (
        <TrendingMessage>No se pudieron cargar las películas en tendencia.</TrendingMessage>
      ) : hasNoTrendingData ? (
        <TrendingMessage>Aún no hay películas en tendencia para mostrar.</TrendingMessage>
      ) : (
        <HeroCarousel movies={trendingMovies} />
      )}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">Pelis Pelis</p>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">Descubre tu próxima película</h1>
        <p className="mt-5 max-w-xl text-zinc-400">
          Explora historias inolvidables, guarda tus favoritas y comparte recomendaciones con la comunidad.
        </p>
      <div className="mx-auto grid max-w-7xl gap-6 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
      </section>
    </PageShell>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      <Header />
      <section>{children}</section>
    </main>
  )
}

function TrendingMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-80 items-center justify-center border-b border-white/10 px-6 text-center text-zinc-400">
      {children}
    </div>
  )
}
