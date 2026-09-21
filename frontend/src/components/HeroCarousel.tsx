import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Movie } from '@/types/movie'

interface HeroCarouselProps {
  movies: Movie[]
}

const backdropBaseUrl = 'https://image.tmdb.org/t/p/original'

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (movies.length < 2) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % movies.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [movies.length])

  if (movies.length === 0) return null

  const currentIndex = activeIndex % movies.length
  const movie = movies[currentIndex]
  const goTo = (direction: number) => {
    setActiveIndex((current) => (current + direction + movies.length) % movies.length)
  }

  return (
    <section className="relative isolate overflow-hidden rounded-b-2xl border-b border-white/10 bg-[#181b22] shadow-2xl shadow-black/20" aria-label="Películas en tendencia">
      <div className="relative min-h-[32rem] sm:min-h-[38rem]">
        {movie.backdrop_path ? (
          <img
            key={movie.id}
            src={`${backdropBaseUrl}${movie.backdrop_path}`}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700"
          />
        ) : null}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0f14]/95 via-[#0d0f14]/65 to-[#0d0f14]/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d0f14]/90 via-transparent to-[#0d0f14]/20" />

        <div className="mx-auto flex min-h-[32rem] max-w-7xl items-end px-6 py-14 sm:min-h-[38rem] sm:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-400">En tendencia esta semana</p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">{movie.title}</h1>
            <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
              {movie.overview || 'Descubre esta película y déjate llevar por una nueva historia.'}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={`/pelicula/${movie.id}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-500 px-5 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:from-red-600 hover:to-red-400"
              >
                <Play className="size-4 fill-current" aria-hidden="true" />
                Ver detalles
              </Link>
              <span className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur">
                {movie.vote_average.toFixed(1)} ★
              </span>
            </div>
          </div>
        </div>

        {movies.length > 1 ? (
          <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:right-10">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Película anterior"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-red-500 hover:bg-red-600"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-1.5 px-1" aria-label={`Película ${currentIndex + 1} de ${movies.length}`}>
              {movies.slice(0, Math.min(movies.length, 5)).map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Mostrar ${item.title}`}
                  className={`h-1.5 cursor-pointer rounded-full transition-all ${index === currentIndex ? 'w-7 bg-red-500' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Siguiente película"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:border-red-500 hover:bg-red-600"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
