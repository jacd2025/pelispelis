import type { ReactNode } from 'react'
import { Heart, Info } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { HeroCarousel } from '@/components/HeroCarousel'
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
          <article
            key={movie.id}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#17191f] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1 hover:border-red-500/50"
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Poster de ${movie.title}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                  Imagen no disponible
                </div>
              )}
              <button
                type="button"
                aria-label={`Añadir ${movie.title} a favoritos`}
                className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-red-600"
              >
                <Heart className="size-4" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <h2 className="line-clamp-2 font-bold text-white">{movie.title}</h2>
              <Link
                to={`/pelicula/${movie.id}`}
                aria-label={`Ver detalles de ${movie.title}`}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-red-500 hover:text-red-400"
              >
                <Info className="size-4" />
              </Link>
            </div>
            <p className="px-4 pb-4 text-sm text-zinc-500">
              {movie.release_date ? movie.release_date.slice(0, 4) : 'Sin fecha'}
              {' · '}
              {movie.vote_average.toFixed(1)} ★
            </p>
          </article>
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
