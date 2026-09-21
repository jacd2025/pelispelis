import { LoaderCircle, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { useMovieSearch } from '@/hooks/useMovieSearch'

export function MovieSearch() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, isFetching, isError } = useMovieSearch(query)
  const results = Array.isArray(data) ? data : []
  const showResults = isFocused && query.trim().length >= 2

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="group relative block w-full" htmlFor="movie-search">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-red-400" aria-hidden="true" />
        <input
          id="movie-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Buscar películas..."
          className="h-10 w-full rounded-xl border border-white/10 bg-gradient-to-r from-zinc-900 via-zinc-950 to-red-950/40 pl-10 pr-9 text-sm text-white outline-none transition-all placeholder:text-zinc-500 hover:border-red-500/30 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20"
          aria-label="Buscar películas"
          aria-expanded={showResults}
          aria-controls="movie-search-results"
        />
        {query ? (
          <button type="button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-zinc-500 hover:bg-white/10 hover:text-white">
            <X className="size-3.5" />
          </button>
        ) : null}
      </label>
      {showResults ? (
        <div id="movie-search-results" className="movie-detail-scroll absolute left-1/2 top-[calc(100%+0.75rem)] z-[70] max-h-[min(70vh,36rem)] w-[min(90vw,48rem)] -translate-x-1/2 overflow-x-hidden overflow-y-auto rounded-2xl border border-white/10 bg-[#14161c]/[.98] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-400"><LoaderCircle className="size-4 animate-spin" />Buscando películas...</div>
          ) : isError ? (
            <p className="py-10 text-center text-sm text-red-300">No se pudo completar la búsqueda.</p>
          ) : results.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-400">No encontramos películas para “{query}”.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} showFavorite={false} className="text-xs" />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
