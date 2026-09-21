import { Heart } from 'lucide-react'
import { useState } from 'react'
import type { Movie } from '@/types/movie'
import { MovieDetailModal } from '@/components/MovieDetailModal'
import { cn } from '@/lib/utils'

interface MovieCardProps {
  movie: Movie
  showFavorite?: boolean
  onFavorite?: (movie: Movie) => void
  className?: string
}

export function MovieCard({ movie, showFavorite = true, onFavorite, className }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <article
        className={cn(
          'group relative overflow-hidden rounded-xl border border-white/10 bg-[#17191f] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1 hover:border-red-500/50',
          className,
        )}
      >
        <button type="button" onClick={() => setIsModalOpen(true)} className="block w-full cursor-pointer text-left">
          <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500">Imagen no disponible</div>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 p-4">
            <h2 className="line-clamp-2 font-bold text-white">{movie.title}</h2>
          </div>
          <p className="px-4 pb-4 text-sm text-zinc-500">
            {movie.release_date ? movie.release_date.slice(0, 4) : 'Sin fecha'} · {movie.vote_average.toFixed(1)} ★
          </p>
        </button>
        {showFavorite ? (
          <button
            type="button"
            onClick={() => onFavorite?.(movie)}
            aria-label={`Añadir ${movie.title} a favoritos`}
            className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-red-600"
          >
            <Heart className="size-4" />
          </button>
        ) : null}
      </article>
      {isModalOpen ? <MovieDetailModal movie={movie} onClose={() => setIsModalOpen(false)} /> : null}
    </>
  )
}
